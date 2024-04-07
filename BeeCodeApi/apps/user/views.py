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
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer, LikeSerializer

# Create your views here.
# 1.手机号短信登录
class MobileView(ViewSet):

    # 校验手机号是否正确
    @action(methods=['GET'], detail=False)
    def verify_mobile(self, request, *args, **kwargs):
        try:
            # 取出前端传过来的手机号
            mobile = request.query_params['mobile']
            print(mobile)
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
        return APIResponse(user_id=user_id,username=username, token=token, icon=icon)

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
            serializer = self.serializer_class(instance=user,data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return APIResponse(msg='密码设置成功')
        return APIResponse(msg='账号输入错误')



from rest_framework.viewsets import ModelViewSet,ReadOnlyModelViewSet
# Achievements / Accomplishments
class AchievementViewSet(GenericViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    authentication_classes = [JSONWebTokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    # 签到表
    @action(detail=False, methods=['post'])
    def earn_achievement(self, request,*args,**kwargs):
        # print(request.META) # HTTP_USERNAME
        user = request.META.get('HTTP_USERNAME')
        serializer = self.serializer_class(instance=request.user,data=request.data)
        serializer.context['user'] = user
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(msg='签到成功')


    # 时时返回的签到标签
    @action(detail=False, methods=['post'])
    def earn_achieve(self,request):
        # 判断成就是否完成条件 添加达成返回200
        # signin_count = Achievement.objects.aggregate(total_signin=Sum('signin'))['total_signin']
        username = request.META.get('HTTP_USERNAME')
        user = models.User.objects.filter(username=username).first()
        signin_count = Achievement.objects.filter(user=user).aggregate(total_signin=Sum('signin'))['total_signin']
        if signin_count == 7:
            return APIResponse(code=705,msg='签到新星')
        elif signin_count == 15:
            return APIResponse(code=706, msg='签到达人')
        return APIResponse(code=201,msg='没有成就')
        # 后续补充 查表操作


# 朋友圈系列
# user/views.py
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.CirCleHomeSerializer
    pagination_class = PostPageNumberPagination


    def get_serializer_class(self):
        if self.action == 'circle_of_friends_home':
            return serializers.UserPostSerializer
        else:
            return super().get_serializer_class()

    # 点进去之后展示的数据
    @action(methods=['post'],detail=False)
    def circle_of_friends_home(self,request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return APIResponse(serializer.data)



# 添加评论功能
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_class(self):
        if self.action == 'article_detail':
            return serializers.CommSerializer
        else:
            return super().get_serializer_class()


    @action(methods=['post'],detail=False)
    def perform_create(self, request):
        serializers = self.serializer_class(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return APIResponse('评论成功')


    @action(methods=['post'],detail=False)
    def article_detail(self,request):
        serializers = self.get_serializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        return APIResponse(serializers.data)


# 点赞功能
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    @action(methods=['post'],detail=False)
    def list_view(self,request):
        serializers = self.serializer_class(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()
        return APIResponse('点赞成功')



