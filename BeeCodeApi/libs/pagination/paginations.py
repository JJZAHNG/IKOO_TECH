# coding:utf-8
from rest_framework.pagination import PageNumberPagination

# 分页器
# http://127.0.0.1:8000/api/v1/user/posts/?page=2
class PostPageNumberPagination(PageNumberPagination):
    page_size = 2
    page_query_param = 'page'
    page_size_query_param = 'size'
    max_page_size = 2
