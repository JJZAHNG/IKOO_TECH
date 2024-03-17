from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class User(AbstractUser):
    # 扩写auth表 加入手机号 头像
    mobile = models.CharField(verbose_name='手机号', max_length=11, unique=True)

    # 需要pillow包的支持
    icon = models.ImageField(verbose_name='头像', upload_to='icon', default='icon/default.png')

    class Meta:
        db_table = 'BeeCode_user'
        verbose_name = '用户表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username