from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    # 扩写auth表 加入手机号 头像
    mobile = models.CharField(verbose_name='手机号', max_length=11, null=True)
    # 需要pillow包的支持
    icon = models.ImageField(verbose_name='头像', upload_to='icon', default='icon/default.png')
    # 用户的昵称
    nickname = models.CharField(verbose_name='昵称',max_length=32,null=True,blank=True)
    class Meta:
        db_table = 'BeeCode_user'
        verbose_name = '用户表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username


class Self_Project(models.Model):
    project_name = models.CharField(verbose_name='作品名称', max_length=32)
    user_project = models.FileField(max_length=255, upload_to='works', null=True, blank=True)

    class Meta:
        db_table = 'BeeCode_Self_Project'
        verbose_name = '作品表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.project_name


class Personal_Center(models.Model):
    user = models.OneToOneField(User, verbose_name='用户个人中心', on_delete=models.CASCADE)
    bg_img = models.ImageField(verbose_name='背景', upload_to='bg', null=True, blank=True)
    introduction = models.CharField(max_length=255, verbose_name='简介',null=True)
    following = models.ForeignKey(User, related_name='following_set', verbose_name='关注用户', on_delete=models.CASCADE,
                                  null=True, blank=True)
    followers = models.ForeignKey(User, related_name='followers_set', verbose_name='粉丝用户', on_delete=models.CASCADE,
                                  null=True, blank=True)
    project = models.ManyToManyField(Self_Project, verbose_name='作品')
    star = models.ForeignKey(to='Favorite', verbose_name='收藏', on_delete=models.CASCADE, null=True, blank=True)
    qr_code = models.ImageField(verbose_name='二维码', null=True, blank=True)
    wallet = models.DecimalField(verbose_name='钱包', max_digits=5, decimal_places=2, default=0)
    addr = models.CharField(verbose_name='地址', max_length=32,null=True,)

    class Meta:
        db_table = "BeeCode_Personal_Center"
        verbose_name = '个人中心表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.user.username


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


class Achievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    name = models.CharField(max_length=255, verbose_name='成就名称', null=True)
    description = models.TextField(verbose_name='成就描述', null=True)
    earned_at = models.DateTimeField(auto_now_add=True, verbose_name='签到时间')
    signin = models.IntegerField(verbose_name='签到次数', default=0)

    class Meta:
        db_table = 'BeeCode_achievement'
        verbose_name = '成就表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user.username} - {self.name}"


# 文章图片
class PostImage(models.Model):
    img = models.ImageField(upload_to='posts/images/', verbose_name='帖子图片')

    class Meta:
        db_table = 'BeeCode_postimg'
        verbose_name = '帖子图片'
        verbose_name_plural = verbose_name

# 帖子分类表
class Classify_Post(models.Model):
    name = models.CharField(max_length=32,verbose_name='分类名称')



# 帖子表
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255, verbose_name='标题', null=True, blank=True)  # 新增标题字段
    text = models.TextField(verbose_name='帖子内容')
    comment_like_num = models.IntegerField(verbose_name='文章点赞数', default=0)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='发布时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    classify_name = models.ForeignKey(Classify_Post, on_delete=models.PROTECT,null=True)
    post_s = models.ManyToManyField(PostImage)
    is_featured = models.BooleanField(default=False, verbose_name='是否为精选文章')

    class Meta:
        db_table = 'BeeCode_post'
        verbose_name = '帖子表'
        verbose_name_plural = verbose_name
        ordering = ['-update_time']

    def __str__(self):
        return f"{self.user.username} - {self.text[:20]}"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(verbose_name='评论内容')
    post_like_num = models.IntegerField(verbose_name='评论点赞数', default=0)
    comment_num = models.IntegerField(verbose_name='文章评论数', default=0)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='评论时间')
    parent = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'BeeCode_comment'
        verbose_name = '评论表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.text


# 文章点赞表
class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_likes')


# 评论点赞表
class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment_likes')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_likes')


class Favorite(models.Model):  # 新增收藏模型，关联用户和帖子
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='favorites')

    class Meta:
        unique_together = ('user', 'post')  # 确保用户对同一帖子只能收藏一次
        db_table = 'BeeCode_favorite'
        verbose_name = '收藏表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.user.username} - {self.post.id}"
