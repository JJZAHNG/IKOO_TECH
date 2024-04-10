# your_project/routing.py

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from .consumers import ChatConsumer


websocket_urlpatterns = [
    re_path(r'ws/streaming/(?P<room_name>\w+)/$', ChatConsumer.as_asgi()),
]


application = ProtocolTypeRouter({
    'websocket': URLRouter(websocket_urlpatterns),
})

