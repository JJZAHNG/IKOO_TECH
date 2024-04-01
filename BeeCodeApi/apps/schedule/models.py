import json

from django.db import models
from django.contrib.auth.models import AbstractUser
from utils.common_models import BaseModel


# 课程分类表
class Course_Classify(models.Model):
    course_classify_name = models.CharField(max_length=11,verbose_name='分类名称',unique=True)


    class Meta:
        db_table = 'Course_Classify'
        verbose_name_plural='分类表'

    def __str__(self):
        return self.course_classify_name

class Course_Cover(BaseModel):
    course_cover_name = models.ImageField(verbose_name='封面图', upload_to='cover')


    class Meta:
        db_table = 'BeeCode_cover'
        verbose_name_plural='封面图表'



# 课程表
class Course(BaseModel):
    course_name = models.CharField(max_length=11,verbose_name='课程名称')
    course_synopsis = models.TextField(max_length=255,verbose_name='课程介绍',blank=True,null=True)
    course_price = models.IntegerField(verbose_name='课程价格',null=True,blank=True)
    course_content = models.ImageField(verbose_name='内容', upload_to='content')
    # link = models.CharField(max_length=64,verbose_name='图片跳转链接')
    is_vip = models.BooleanField(default=True,verbose_name='会员True/False')
    course_category = models.ForeignKey(to="Course_Classify", blank=True, null=True, verbose_name='课程分类',
                                        on_delete=models.SET_NULL, db_constraint=False)
    cover = models.ForeignKey(to="Course_Cover",blank=True, null=True, verbose_name='封面图',
                                        on_delete=models.SET_NULL, db_constraint=False)



    class Meta:
        db_table = 'BeeCode_course'
        verbose_name_plural='课程表'

    def __str__(self):
        return self.course_name

    # 会员可以修改会员等级 v1  v2  v3
    # on_delete=models.SET_NULL 删除该分类不会删除他下方的课程
    # db_constraint=False 不建立物理外键的约束





