from rest_framework.routers import DefaultRouter
from .views import LiveClassViewSet

router = DefaultRouter()
router.register(r'liveclasses', LiveClassViewSet)

urlpatterns = [
    # ... 你的其他路由 ...
] + router.urls

