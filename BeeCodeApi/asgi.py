# asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import BeeCodeApi.Streaming.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BeeCodeApi.settings')

application = ProtocolTypeRouter({
    # Django的ASGI应用程序处理传统的HTTP请求
    "http": get_asgi_application(),

    # WebSocket聊天处理程序
    "websocket": AuthMiddlewareStack(
        URLRouter(
            BeeCodeApi.Streaming.routing.websocket_urlpatterns  # 确保这是正确的路径
        )
    ),
})
