from rest_framework import serializers
from user import models
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler
from django.conf import settings
from django.core.cache import cache
from django.contrib.auth.hashers import make_password, check_password
import re


class UniversalSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        # 校验用户名密码是否正确
        user = self._get_user(attrs)

        # 签发token
        token = self._get_token(user)

        # 把签发的token放到context中
        self.context['username'] = user.username
        self.context['token'] = token
        self.context['icon'] = settings.BACKEND_URL + '/media/' + str(user.icon)

        return attrs

    def _get_user(self, attrs):
        pass
       

    def _get_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

# 用户名密码登录
class UserLoginSerializer(UniversalSerializer):
    def _get_user(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user = models.User.objects.filter(Q(username=username) | Q(mobile=username) | Q(email=username)).first()

        if user and user.check_password(password):
            return user
        else:
            raise ValidationError('用户名或密码错误')

# 手机号登录
class SMSLoginSerializer(serializers.Serializer):
    mobile = serializers.CharField()
    code = serializers.CharField()


    def validate_mobile(self,var):
        if re.match('^1[3-9]\d{9}$',var):
             raise ValidationError('手机号格式错误')
        return var

    def validate(self, attrs):
        # 校验用户名密码是否正确
        user = self._get_user(attrs)

        # 签发token
        token = self._get_token(user)

        # 把签发的token放到context中
        self.context['username'] = user.username
        self.context['token'] = token
        self.context['icon'] = settings.BACKEND_URL + '/media/' + str(user.icon)

        return attrs
    def _get_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

    def _get_user(self, attrs):
        mobile = attrs.get('mobile')
        code = attrs.get('code')
        old_code = cache.get('cache_mobile_%s' % mobile)
        if code == old_code or (settings.DEBUG and code == '1111'):
            user = models.User.objects.filter(mobile=mobile).first()
            return user
        else:
            raise ValidationError('验证码错误')
    
    
# 手机号注册
class UserRegisterSerializer(serializers.ModelSerializer):
    # code不是表中字段需要重写
    code = serializers.CharField(max_length=4, min_length=4, write_only=True)
    class Meta:
        model = models.User
        fields = ['mobile', 'code']

    def validate(self, attrs):
        mobile = attrs.get('mobile')
        code = attrs.get('code')
        old_code = cache.get('cache_mobile_%s' % mobile)

        # 校验手机号是否被注册
        if models.User.objects.filter(mobile=mobile).first():
            raise ValidationError('该手机号已经被注册')

        # 校验code 是否正确
        if code == old_code or (settings.DEBUG and code == '1111'):  # 测试阶段 万能验证码

            # 入库前剔除code字段 username必填
            attrs.pop('code')
            attrs['username'] = mobile
        else:
            raise ValidationError('验证码错误')
        return attrs

    # 不重写create方法密码存进去是明文
    def create(self, validated_data):
        user = models.User.objects.create_user(**validated_data)
        return user


class RegisterSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(max_length=9)
    tow_password = serializers.CharField()
    
    class Meta:
        model = models.User
        fields = ['username','password','tow_password']


    def validate_password(self,var):
        if len(var) < 8:
            raise ValidationError('密码长度要大于8个字符')
        return var


    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        tow_password = attrs.get('tow_password')
        if password == tow_password:
            attrs.pop('tow_password')
            return attrs
        else:
            raise ValidationError('两次密码不一致')
    
    def create(self, validated_data):
        user = models.User.objects.create_user(**validated_data)
        return user


