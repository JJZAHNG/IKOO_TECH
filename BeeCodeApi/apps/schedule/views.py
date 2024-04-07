from rest_framework.viewsets import GenericViewSet
from .models import Course_Classify,Course_Cover,Course
from rest_framework.mixins import ListModelMixin,RetrieveModelMixin
from .serializers import CourseSerializer,Course_Classify_Serializer,ClassifySerializer
from utils.common_response import APIResponse
from rest_framework.decorators import action
from rest_framework import generics


# 查询所有的课程分类
class Course_Classify_View(GenericViewSet,ListModelMixin,RetrieveModelMixin):
    queryset = Course_Classify.objects.all()
    serializer_class = Course_Classify_Serializer


# 查询所有课程接口
class CourseView(GenericViewSet,ListModelMixin,RetrieveModelMixin):
    queryset = Course.objects.filter(is_delete=False,is_show=True).order_by('orders')
    serializer_class = CourseSerializer

# 查询分类下所有的课程
class Classify_Course_View(GenericViewSet,generics.ListAPIView):
    serializer_class =ClassifySerializer

    def get_queryset(self):
        classify_id = self.request.data.get('classify_id')
        return Course.objects.filter(course_category_id=classify_id)

    @action(methods=['post'], detail=False)
    def classify_course(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return APIResponse(serializer.data)