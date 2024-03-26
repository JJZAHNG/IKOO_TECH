from rest_framework.routers import SimpleRouter
from user import views

router = SimpleRouter()
# 手机号与发送短信接口
router.register('mobile', views.MobileView, 'mobile')
# 登录
router.register('login', views.UserLoginView, 'login')
# 手机号注册
router.register('register', views.UserRegisterView, 'register')
# 账号密码注册
router.register('user_register', views.RegisterView, 'user_register')
urlpatterns = []
urlpatterns += router.urls
