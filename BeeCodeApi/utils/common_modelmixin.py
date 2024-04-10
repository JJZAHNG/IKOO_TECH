# coding:utf-8
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin,DestroyModelMixin
from utils.common_response import APIResponse


class CreateModelMixins(CreateModelMixin):
    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return APIResponse(code=100,msg='收藏成功')


