from rest_framework.viewsets import ViewSet, GenericViewSet
from rest_framework.decorators import action
from utils.common_response import APIResponse
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from user import models, serializers
from libs.tx_sms import get_code
from libs.pagination.paginations import PostPageNumberPagination
from django.core.cache import cache
from rest_framework.mixins import CreateModelMixin
from celery_task.user_task import send_message
from django.db.models import Sum
from rest_framework import status, viewsets
from .models import User, Achievement
from .serializers import AchievementSerializer
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Post, Comment
from django.db import transaction
from django.db.models import F
from utils.common_modelmixin import CreateModelMixins, UpdateModelMixins
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from datetime import datetime, timedelta


# Create your views here.
# 1.手机号短信登录
class MobileView(ViewSet):

    # 校验手机号是否正确
    @action(methods=['GET'], detail=False)
    def verify_mobile(self, request, *args, **kwargs):
        try:
            # 取出前端传过来的手机号
            mobile = request.query_params['mobile']
            # 去数据库中查询是否存在 且唯一
            models.User.objects.get(mobile=mobile)

            return APIResponse(msg='验证通过')
        # 验证不通过抛出异常
        except ObjectDoesNotExist:
            raise ObjectDoesNotExist('手机号不存在')
        except MultiValueDictKeyError:
            raise MultiValueDictKeyError('没有携带手机号')

    # 发送验证码
    @action(methods=['POST'], detail=False)
    def send_message(self, request, *args, **kwargs):
        # 前端取到传过来的手机号
        mobile = request.data.get('mobile')

        # 随机生成验证码
        code = get_code()
        # 把验证码保存到缓存中
        cache.set('cache_mobile_%s' % mobile, code)

        # celery异步发送短信
        send_message.delay(code, mobile)
        return APIResponse(msg='短信已发送')


# 用户密码 邮箱密码 手机号密码登录
class UserLoginView(GenericViewSet):
    serializer_class = serializers.UserLoginSerializer

    def get_serializer_class(self):
        if self.action == 'sms_login':
            return serializers.SMSLoginSerializer
        else:
            return super().get_serializer_class()

    @action(methods=['POST'], detail=False)
    def _login(self, request, *args, **kwargs):
        ser = self.get_serializer(data=request.data)
        ser.is_valid(raise_exception=True)
        username = ser.context.get('username')
        token = ser.context.get('token')
        icon = ser.context.get('icon')
        user_id = ser.context.get('user_id')
        return APIResponse(user_id=user_id, username=username, token=token, icon=icon)

    # 多方式登陆
    @action(methods=['POST'], detail=False)
    def mul_login(self, request, *args, **kwargs):
        return self._login(request, *args, **kwargs)

    # 短信登陆
    @action(methods=['POST'], detail=False)
    def sms_login(self, request, *args, **kwargs):
        return self._login(request, *args, **kwargs)


# 手机号注册接口
class UserRegisterView(GenericViewSet, CreateModelMixin):
    serializer_class = serializers.UserRegisterSerializer

    @action(methods=['POST'], detail=False)
    def mobile_registration(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return APIResponse(msg='注册成功')


# 用户账号注册
class RegisterView(GenericViewSet):
    serializer_class = serializers.RegisterSerializer

    @action(methods=['POST'], detail=False)
    def user_register(self, request, *args, **kwargs):
        res = self.get_serializer(data=request.data)
        res.is_valid(raise_exception=True)
        res.save()
        return APIResponse(msg='注册成功')


# 忘记密码
# 忘记密码也先验证手机号 与 验证码 发送验证码
class ForgetpwdView(GenericViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.SetPwdSerializer

    @action(detail=False, methods=['post'])
    def setpwd(self, request, *args, **kwargs):
        username = request.data.get('username')
        user = models.User.objects.filter(username=username).first()
        if user:
            serializer = self.serializer_class(instance=user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return APIResponse(msg='密码设置成功')
        return APIResponse(msg='账号输入错误')


from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet


# Achievements / Accomplishments
class AchievementViewSet(GenericViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    authentication_classes = [JSONWebTokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    # 签到表
    @action(detail=False, methods=['post'])
    def earn_achievement(self, request, *args, **kwargs):
        user = request.META.get('HTTP_USERNAME')
        serializer = self.serializer_class(instance=request.user, data=request.data)
        serializer.context['user'] = user
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(msg='签到成功')

    # 时时返回的签到标签
    @action(detail=False, methods=['post'])
    def earn_achieve(self, request):
        # 判断成就是否完成条件 添加达成返回200
        # signin_count = Achievement.objects.aggregate(total_signin=Sum('signin'))['total_signin']
        username = request.META.get('HTTP_USERNAME')
        user = models.User.objects.filter(username=username).first()
        signin_count = Achievement.objects.filter(user=user).aggregate(total_signin=Sum('signin'))['total_signin']
        if signin_count == 7:
            return APIResponse(code=705, msg='签到新星')
        elif signin_count == 15:
            return APIResponse(code=706, msg='签到达人')
        return APIResponse(code=201, msg='没有成就')
        # 后续补充 查表操作


# 朋友圈系列
# user/views.py
# 展示所有朋友圈内容
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.CirCleHomeSerializer
    pagination_class = PostPageNumberPagination

    def get_queryset(self):
        date_time = datetime.now().date()
        res = cache.get('11')
        ls = []
        if res is not None:
            for k, v in res.items():
                if k <= '{}'.format(date_time):
                    ls.extend(v)
        first_queryset = self.queryset.exclude(id__in=ls).filter(comment_like_num__gte=300).order_by(
            '-comment_like_num')[:3]
        end_queryset = self.queryset.exclude(id__in=[i.id for i in first_queryset])
        queryset = first_queryset.union(end_queryset)
        return queryset

    def get_serializer_class(self):
        if self.action == 'content_home':
            return serializers.ContentSerializer
        elif self.action == 'add_comment_content':
            return serializers.CommentSerializer
        else:
            return super().get_serializer_class()

    # 朋友圈内容  携带帖子的id
    @action(methods=['post'], detail=False)
    def content_home(self, request):
        res = models.Post.objects.filter(pk=request.data.get('post')).first()
        serializer = self.get_serializer(instance=res)
        return APIResponse(serializer.data)

    # 添加评论
    @action(methods=['post'], detail=False)
    def add_comment_content(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse('评论成功')


# 展示评论内容
class Comment_View(GenericViewSet):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommtSerializer

    @action(methods=['post'], detail=False)
    def article_detail(self, request):
        queryset = self.get_queryset()
        serializers = self.get_serializer(instance=queryset, many=True)
        return APIResponse(serializers.data)

    def get_queryset(self):
        data = self.request.data
        return super().get_queryset().filter(post_id=data.get('post')).filter(parent_id__isnull=True)


# 点赞功能
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.CommentLikeSerializer

    def get_object(self, queryset=None):
        if self.action == 'like_post':
            queryset = self.filter_queryset(self.get_queryset())
            obj = queryset.get(pk=self.request.data.get('post'))
            self.check_object_permissions(self.request, obj)
            return obj
        elif self.action == 'like_comment':
            queryset = self.filter_queryset(self.get_queryset())
            obj = queryset.get(pk=self.request.data.get('comment'))
            self.check_object_permissions(self.request, obj)
            return obj

    def get_queryset(self):
        if self.action == 'like_comment':
            return Comment.objects.all()
        else:
            return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'like_post':
            return serializers.PostLikeSerializer
        else:
            return super().get_serializer_class()

    @action(methods=['post'], detail=False)
    def like_post(self, request):
        post = self.get_object()
        if post.post_likes.filter(user_id=request.data.get('user')).exists():
            return APIResponse(code=701, msg='文章已经点过赞')

        post.post_likes.create(user_id=request.data.get('user'))
        Post.objects.filter(pk=post.pk).update(comment_like_num=F('comment_like_num') + 1)
        return APIResponse('文章点赞成功')

    @action(methods=['post'], detail=False)
    def like_comment(self, request):
        comment = self.get_object()

        if comment.comment_likes.filter(user_id=request.data.get('user')).exists():
            return APIResponse(code=702, msg='评论已点赞')

        with transaction.atomic():
            comment.comment_likes.create(user_id=request.data.get('user'))
            Comment.objects.filter(pk=comment.pk).update(post_like_num=F('post_like_num') + 1)

        return APIResponse('评论点赞成功')


# 收藏
class CollectView(GenericViewSet, CreateModelMixins):
    queryset = models.Favorite.objects.all()
    serializer_class = serializers.CollectSerializer


# 个人中心--
class Personal_CenterView(GenericViewSet, RetrieveModelMixin):
    queryset = models.User.objects.all()
    serializer_class = serializers.Personal_CenterSerializer

    def get_queryset(self):
        if self.action == 'acctCenterupdate':
            return models.Personal_Center.objects.all()
        else:
            return super().get_queryset()

    def get_serializer_class(self):
        if self.action == 'acctCenterupdate':
            return serializers.AcctCenterSerializer
        else:
            return super().get_serializer_class()

    def get_object(self, id=None):
        if self.action == 'acctCenterupdate':
            return self.get_queryset().filter(user_id=id).first()
        else:
            return super().get_object()

    # 修改个人信息
    @action(methods=['post'], detail=False)
    def acctCenterupdate(self, request):
        instance = self.get_object(request.data.get('user'))
        serializer = self.get_serializer(instance=instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(code=100, msg='修改成功')


class SettingView(GenericViewSet, UpdateModelMixins):
    queryset = User.objects.all()
    serializer_class = serializers.Change_PwdSerializer

    def get_serializer_class(self):
        if self.action == 'change_mb':
            return serializers.Change_mbSerializer
        else:
            return super(SettingView, self).get_serializer_class()

    # 修改密码
    @action(methods=['post'], detail=True)
    def change_user(self, request,*args,**kwargs):
        instance = self.get_object()
        serializers = self.get_serializer(instance=instance, data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return APIResponse(code=100, msg='密码修改成功')

    # 修改手机号
    @action(methods=['post'], detail=True)
    def change_mb(self, request,*args,**kwargs):
        instance = self.get_object()
        serializers = self.get_serializer(instance=instance, data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return APIResponse(code=100, msg='修改成功')

    # 注销用户
    @action(methods=['post'], detail=False)
    def change_pwd(self, request):
        res = User.objects.filter(id=request.data.get('user'))
        if res:
            res.delete()
            return APIResponse(code=100, msg='注销成功')
        return APIResponse(code=879,msg='没有该用户')

class PrivacyView(GenericViewSet,RetrieveModelMixin):
    queryset = models.Personal_Center.objects.all()
    serializer_class = serializers.BeanSerializer

    def get_serializer_class(self):
        if self.action=='concern_user':
            return serializers.Concern_UserSerializer
        elif self.action =='like_works':
            return serializers.Like_WorksSerializer
        elif self.action == 'collect_post':
            return serializers.Collect_Serializer
        else:
            return super().get_serializer_class()
    
    def get_queryset(self):
        if self.action == 'concern_user' or self.action == 'like_works':
            return models.User.objects.all()
        elif self.action == 'collect_post':
            return models.Favorite.objects.all()
        else:
            return super().get_queryset()

    # 查询关注用户
    @action(methods=['post'], detail=True)
    def concern_user(self, request,*args,**kwargs):
        instance = self.get_queryset().filter(pk=kwargs['pk']).first()
        serializers = self.get_serializer(instance=instance)
        return APIResponse(serializers.data)

    # 查询粉丝
    @action(methods=['post'], detail=True)
    def like_works(self, request,*args,**kwargs):
        instance = self.get_queryset().filter(pk=kwargs['pk']).first()
        serializers = self.get_serializer(instance=instance)
        return APIResponse(serializers.data)

    # 查收藏
    @action(methods=['post'], detail=True)
    def collect_post(self, request,*args,**kwargs):
        instances = self.get_queryset().filter(user_id=kwargs['pk'])
        serializers = self.get_serializer(instance=instances)
        return APIResponse(serializers.data)

    # 查看我的作品
    @action(methods=['post'], detail=True)
    def collect(self, request,*args,**kwargs):
        instance = self.get_queryset().filter(user_id=kwargs['pk']).first()
        serializers = self.get_serializer(instance=instance)
        return APIResponse(serializers.data)

# 添加作品
class AddCollectView(ViewSet):
    @action(methods=['post'],detail=False)
    def add_project(self,request,*args,**kwargs):
        user_id = request.data.get('user')
        project_name = request.data.get('project_name')
        project_file = request.FILES.get('file')
        obj = models.Personal_Center.objects.filter(user_id=user_id).first()
        project_obj = models.Self_Project.objects.create(project_name=project_name, user_project=project_file)
        obj.project = project_obj
        obj.save()
        return APIResponse('作品添加成功')

    