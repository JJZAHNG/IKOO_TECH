# coding:utf-8
from django.db import models



class BaseModel(models.Model):
    create_time = models.DateTimeField(auto_now_add=True,verbose_name='创建时间',)
    update_time = models.DateTimeField(auto_now=True,verbose_name='更新时间')
    is_show= models.BooleanField(default=True,verbose_name='是否上架')
    is_delete = models.BooleanField(default=False,verbose_name='是否删除')
    orders = models.IntegerField(verbose_name='优先级')


    class Meta:
        abstract = True