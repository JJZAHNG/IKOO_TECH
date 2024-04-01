from rest_framework.viewsets import GenericViewSet
from .models import Course_Classify,Course_Cover
from rest_framework.mixins import ListModelMixin,RetrieveModelMixin
from .serializers import CourseSerializer,Course_Classify_Serializer




# 查询所有的课程分类
class Course_Classify_View(GenericViewSet,ListModelMixin,RetrieveModelMixin):
    queryset = Course_Classify.objects.all()
    serializer_class = Course_Classify_Serializer


# 查询所有课程接口
class CourseView(GenericViewSet,ListModelMixin,RetrieveModelMixin):
    queryset = Course_Cover.objects.filter(is_delete=False,is_show=True).order_by('orders')
    serializer_class = CourseSerializer

