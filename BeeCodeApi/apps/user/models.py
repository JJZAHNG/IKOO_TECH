from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class User(AbstractUser):
    # 扩写auth表 加入手机号 头像
    mobile = models.CharField(verbose_name='手机号', max_length=11,null=True)

    # 需要pillow包的支持
    icon = models.ImageField(verbose_name='头像', upload_to='icon', default='icon/default.png')

    class Meta:
        db_table = 'BeeCode_user'
        verbose_name = '用户表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_member = models.BooleanField(default=False, verbose_name='是否是会员')
    avatar = models.ImageField(upload_to='icon', null=True, blank=True, verbose_name='头像')
    nickname = models.CharField(max_length=255, null=True, blank=True, verbose_name='昵称')
    phone = models.CharField(max_length=20, null=True, blank=True, unique=True, verbose_name='绑定手机号')

    class Meta:
        db_table = 'BeeCode_profile'
        verbose_name = '用户表'
        verbose_name_plural = verbose_name


    def __str__(self):
        return self.user.username

