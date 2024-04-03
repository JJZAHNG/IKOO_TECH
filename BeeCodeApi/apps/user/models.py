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




# Table Achievenment Add In
# user/models.py

class Achievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    name = models.CharField(max_length=255, verbose_name='成就名称',null=True)
    description = models.TextField(verbose_name='成就描述',null=True)
    earned_at = models.DateTimeField(auto_now_add=True, verbose_name='签到时间')
    # 成就条件
    # 签到次数
    signin = models.IntegerField(verbose_name='签到次数',default=0)



    class Meta:
        db_table = 'BeeCode_achievement'
        verbose_name = '成就表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user.username} - {self.name}"





# 朋友圈系列
# user/models.py
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    text = models.TextField(verbose_name='帖子内容')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='发布时间')
    image = models.ImageField(upload_to='posts/images/', null=True, blank=True, verbose_name='帖子图片')

    class Meta:
        db_table = 'BeeCode_post'
        verbose_name = '帖子表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user.username} - {self.text[:20]}"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(verbose_name='评论内容')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='评论时间')

    class Meta:
        db_table = 'BeeCode_comment'
        verbose_name = '评论表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user.username} - {self.text[:20]}"


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='点赞时间')

    class Meta:
        db_table = 'BeeCode_like'
        verbose_name = '点赞表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user.username} - {self.post.id}"
