from rest_framework.routers import SimpleRouter
from ChatBot import views

router = SimpleRouter()
# 客服咨询接口
router.register('chat', views.BotChat, 'chat')

urlpatterns = []
urlpatterns += router.urls
