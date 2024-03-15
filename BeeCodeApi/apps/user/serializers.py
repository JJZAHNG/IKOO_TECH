from rest_framework import serializers
from user import models
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler
from django.conf import settings
from django.core.cache import cache


class UniversalSerializer(serializers.Serializer):
    def validate(self, attrs):
        print(attrs)
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


class UserLoginSerializer(UniversalSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def _get_user(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = models.User.objects.filter(Q(username=username) | Q(mobile=username) | Q(email=username)).first()

        if user and user.check_password(password):
            return user
        else:
            raise ValidationError('用户名或密码错误')


class SMSLoginSerializer(UniversalSerializer):
    mobile = serializers.CharField()
    code = serializers.CharField()

    def _get_user(self, attrs):
        mobile = attrs.get('mobile')
        code = attrs.get('code')

        old_code = cache.get('cache_mobile_%s' % mobile)
        if code == old_code or (settings.DEBUG and code == '1111'):
            user = models.User.objects.filter(mobile=mobile).first()
            return user
        else:
            raise ValidationError('验证码错误')


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


# 手机号一键登录
class UserMobileRegisterSerializer(UniversalSerializer):
    code = serializers.CharField(max_length=4, min_length=4, write_only=True)
    mobile = serializers.CharField()

    def _get_user(self, attrs):

        # 拿到前端传过来的数据
        mobile = attrs.get('mobile')
        code = attrs.get('code')
        old_code = cache.get('cache_mobile_%s' % mobile)

        # 校验code 是否正确
        if code == old_code or (settings.DEBUG and code == '1111'):  # 测试阶段 万能验证码

            # 根据手机号获取用户
            user = models.User.objects.filter(mobile=mobile).first()
            if user:
                return user

            else:
                # 入库前剔除code字段 username必填
                attrs.pop('code')
                attrs['username'] = mobile
                attrs['password'] = '1111'
                user = models.User.objects.create_user(**attrs)
                return user
        else:
            raise ValidationError('验证码错误')