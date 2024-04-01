from rest_framework.routers import SimpleRouter
from schedule import views

router = SimpleRouter()
# 查询课程分类
router.register('course_classify', views.Course_Classify_View, 'course_classify')
# 查询课程及其内容
router.register('course', views.CourseView, 'course')
urlpatterns = []
urlpatterns += router.urls
