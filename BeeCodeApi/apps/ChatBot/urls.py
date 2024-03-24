from django.urls import path
from .views import BotChat

urlpatterns = [
    # ... 其他 urlpattern
    path('bot-chat/', BotChat.as_view(), name='bot-chat'),
]
