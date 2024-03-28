from rest_framework.viewsets import ViewSet, GenericViewSet
from rest_framework.decorators import action
from utils.common_response import APIResponse
from django.core.exceptions import ObjectDoesNotExist
from django.utils.datastructures import MultiValueDictKeyError
from user import models, serializers
from libs.tx_sms import get_code
from django.core.cache import cache
from rest_framework.mixins import CreateModelMixin
from rest_framework.generics import CreateAPIView
from django.db.models import Q
from celery_task.user_task import send_message

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
        return APIResponse(username=username, token=token, icon=icon)

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




# 用户输入账号 输入密码 提示错误
# 然后会点击忘记密码  
# 输入账号 判断账号是否存在
# 如果存在通过账号查询id
# 然后修改密码

# 手机号登录输入密码
# 手机号对了 但是密码错误
# 然后就是输入手机号 通过手机号修改密码