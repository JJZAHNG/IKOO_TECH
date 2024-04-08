from rest_framework import serializers
from user import models
from django.db.models import Q,F
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler
from django.conf import settings
from django.core.cache import cache
from django.contrib.auth.hashers import make_password, check_password
import re
import datetime
from .models import Achievement
from .models import Post, Comment
from django.db.models import Sum
from libs.sensitivity import sensitivity_
from django.db import transaction
import random
import string


def get_code(number=6):
    code = ''
    for _ in range(number):
        random_letter = random.choice(string.ascii_letters)
        code += random_letter
    return code


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
        self.context['icon'] = settings.BACKEND_URL + \
                               '/media/' + str(user.icon)

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
        user = models.User.objects.filter(Q(username=username) | Q(
            mobile=username) | Q(email=username)).first()

        if user and user.check_password(password):
            return user
        else:
            raise ValidationError('用户名或密码错误')


# 手机号登录
class SMSLoginSerializer(serializers.Serializer):
    mobile = serializers.CharField()
    code = serializers.CharField()

    def validate_mobile(self, var):
        if not re.match('^1[34578]\d{9}$', var):
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
        self.context['icon'] = settings.BACKEND_URL + \
                               '/media/' + str(user.icon)
        self.context['user_id'] = user.id

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
    code = serializers.CharField(max_length=4, min_length=4, write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = models.User
        fields = ['mobile', 'code', 'password', 'password_confirm']

    def validate_mobile(self, var):
        if not re.match('^1[34578]\d{9}$', var):
            raise ValidationError('手机号格式错误')
        return var

    def validate(self, attrs):
        password = attrs.get('password')
        password_confirm = attrs.get('password_confirm')

        mobile = attrs.get('mobile')
        code = attrs.get('code')
        old_code = cache.get('cache_mobile_%s' % mobile)
        if not models.User.objects.filter(mobile=mobile).first():
            if password_confirm == password:
                if code == old_code or (settings.DEBUG and code == '1111'):
                    attrs.pop('password_confirm')
                    attrs.pop('code')
                    attrs['username'] = get_code()
                else:
                    raise ValidationError('验证码错误')
                return attrs
            raise ValidationError('两次输入手机号不一致')
        raise ValidationError('该手机号已经被注册')

    def create(self, validated_data):

        user = models.User.objects.create_user(**validated_data)
        return user


class RegisterSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(max_length=9)
    tow_password = serializers.CharField()

    class Meta:
        model = models.User
        fields = ['username', 'password', 'mobile', 'tow_password']

    def validate_mobile(self, var):
        if not re.match('^1[34578]\d{9}$', var):
            raise ValidationError('手机号格式错误')
        return var

    def validate_password(self, var):
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


# 设置新密码
class SetPwdSerializer(serializers.ModelSerializer):
    tow_password = serializers.CharField(write_only=True)
    code = serializers.CharField(write_only=True)

    class Meta:
        model = models.User
        fields = ['username', 'password', 'tow_password', 'code', 'mobile']

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('密码长度要大于8个字符')
        return value

    def validate(self, attrs):
        username = attrs.get('username')
        mobile = attrs.get('mobile')
        code = attrs.get('code')
        password = attrs.get('password')
        tow_password = attrs.get('tow_password')
        old_code = cache.get('cache_mobile_%s' % mobile)
        if models.User.objects.filter(username=username, mobile=mobile).first():
            if password == tow_password:
                if code == old_code or (settings.DEBUG and code == '1111'):  # 测试阶段 万能验证码
                    # 入库前剔除code字段 username必填
                    attrs.pop('code')
                    attrs['username'] = mobile
                    return attrs
                else:
                    raise ValidationError('验证码错误')
            raise ValidationError('两次密码不一致')
        raise ValidationError('账号或手机号不存在')

    def update(self, instance, validated_data):
        new_password = validated_data.get('password')
        instance.password = make_password(new_password)
        instance.save()
        return instance
    # 修改密码的另一种
    #     instance.set_password(new_password)


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['pk']

    def validate(self, attrs):
        user = self.context.get('user')
        username = models.User.objects.filter(username=user).first()
        today_records = Achievement.objects.filter(user_id=username.id, earned_at__date=datetime.datetime.now())
        if today_records:
            raise serializers.ValidationError('今天已经签到过')
        return attrs

    def update(self, instance, validated_data):
        user = models.User.objects.filter(username=instance).first()
        # today_record, created = Achievement.objects.get_or_create(user_id=user.id)
        today_record, created = Achievement.objects.update_or_create(user_id=user.id, earned_at=datetime.datetime.now())
        if not created:
            today_record.signin += 1
            today_record.save()
        return instance


# 朋友圈系列
class PostSerializer(serializers.ModelSerializer):
    user_profile_image = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    comment_user = serializers.SerializerMethodField()
    comment_user_img = serializers.SerializerMethodField()
    comment_user_text = serializers.SerializerMethodField()
    comment_user_text_time = serializers.SerializerMethodField()
    user_like_num = serializers.SerializerMethodField()
    post_like_num = serializers.SerializerMethodField()
    content_cover = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = []
        # fields = ['title','username','user_profile_image','image']

    # 评论的用户名
    def get_comment_user(self, obj):
        return obj.comment_set.first().user.username

    # 评论的用户图像
    def get_comment_user_img(self, obj):
        user = obj.comment_set.first().user
        user_icon = settings.BACKEND_URL + '/media/' + str(user.icon)
        return user_icon

    # 评论内容
    def get_comment_user_text(self, obj):
        posts = obj.comment_set.all()
        comments_text = []
        for comment in posts:
            comments_text.append(comment.text)
        return comments_text

    # 评论的时间
    def get_comment_user_text_time(self, obj):
        return obj.comment_set.first().created_at

    # 评论点赞数
    def get_post_like_num(self, obj):
        return obj.likes.first().post_like_num

    def get_username(self, obj):
        return obj.user.username

    # 发表文章用户的头像
    def get_user_profile_image(self, obj):
        # 获取发帖用户的图像
        user = obj.user
        user_icon = settings.BACKEND_URL + '/media/' + str(user.icon)
        return user_icon

    # 发表的图片
    def get_content_cover(self, obj):
        imgs = obj.post_s.all()
        comments_text = []
        for img in imgs:
            comments_text.append(settings.BACKEND_URL + '/media/' + str(img.img))
        return comments_text

    # 文章点赞数量
    def get_user_like_num(self, obj):
        return obj.likes.first().comment_like_num


class CirCleHomeSerializer(PostSerializer):
    post_love_num = serializers.IntegerField(source='comment_like_num')
    class Meta:
        model = Post
        fields = ['id', 'title', 'username', 'user_profile_image','content_cover', 'post_love_num','created_at']


class ContentSerializer(PostSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'username','text', 'user_profile_image', 'content_cover', 'created_at']



class CommentSerializer(serializers.ModelSerializer):
    comment_id = serializers.CharField(write_only=True,allow_null=True,required=False)
    class Meta:
        model = Comment
        fields = ['user', 'post', 'text','comment_id']
        extra_kwargs = {
            'post': {'write_only': True},
            'user': {'write_only': True},
            'text': {'write_only': True}
        }

    def validate_text(self, obj):
        if sensitivity_.contains_sensitive_word(obj):
            raise ValidationError('你输入的是敏感词汇请重新输入')
        return obj

    def create(self, validated_data):
        user_like = models.Comment.objects.create(user=validated_data.get('user'),post=validated_data.get('post'),text=validated_data.get('text'),parent_id=validated_data.get('comment_id'))
        user_like.comment_num = F('comment_num') + 1
        user_like.save()
        return validated_data


class CommtSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()
    comment_like_num = serializers.IntegerField(source='post_like_num')
    class Meta:
        model = Comment
        fields = ['id','post','username','text','created_at','comment_like_num','children','comment_num']
        extra_kwargs = {
            'text':{"read_only":True},
            'post':{"write_only":True},
            'user':{"write_only":True}
        }

    def get_username(self,obj):
        return obj.user.username

    def get_like(self,obj):
        return obj.comment_num

    def get_children(self,args):
        parent_id = args
        res = []

        def child_data(obj_id):
            objs = Comment.objects.filter(parent_id=obj_id)
            for obj in objs:
                res.append({'id':obj.id,'username':obj.user.username,'text':obj.text,'created_at':obj.created_at,'comment_reply_num,':obj.post_like_num,'comment_id':obj.parent_id})
                child_data(obj.id)
        child_data(parent_id)
        return res

# class LikeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Like
#         fields = ['user', 'post']
#         # user_id
#         # 文章 id
#
#     def validate(self, attrs):
#         user = attrs.get('user')
#         post = attrs.get('post')
#         existing_like = Like.objects.filter(user_id=user, post_id=post).count()
#         if existing_like:
#             raise serializers.ValidationError("你已经点过赞了该帖子。")
#         return attrs
#
#     def create(self, validated_data):
#         user_id = validated_data.get('user')
#         post_id = validated_data.get('post')
#         with transaction.atomic():
#             user_like = models.Like.objects.create(user_id=user_id, post_id=post_id)
#             user_like.comment_like_num += 1
#             user_like.save()
#         return validated_data
