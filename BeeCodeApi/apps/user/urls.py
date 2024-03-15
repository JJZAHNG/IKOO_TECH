from rest_framework.routers import SimpleRouter
from ..user import views

router = SimpleRouter()
router.register('mobile', views.MobileView, 'mobile')
router.register('login', views.UserLoginView, 'login')
router.register('register', views.UserRegisterView, 'register')
urlpatterns = []
urlpatterns += router.urls