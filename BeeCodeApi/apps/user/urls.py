from rest_framework.routers import SimpleRouter
from user import views

router = SimpleRouter()
# 手机号与发送短信接口
router.register('mobile', views.MobileView, 'mobile')
# 登录
router.register('login', views.UserLoginView, 'login')
# 手机号注册
router.register('mobile_register', views.UserRegisterView, 'mobile_register')
# 账号密码注册
router.register('user_register', views.RegisterView, 'user_register')
# 忘记密码
router.register('forget_pwd', views.ForgetpwdView, 'forget_pwd')
# 个人成就
router.register('achievements', views.AchievementViewSet, 'achievements')
# 朋友圈系列
router.register('posts', views.PostViewSet, 'posts')
router.register('comments', views.CommentViewSet, 'comments')
router.register('likes', views.LikeViewSet, 'likes')

urlpatterns = []
urlpatterns += router.urls
