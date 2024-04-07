from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/bot/', include("ChatBot.urls")),
    path('api/v1/user/', include('user.urls')),
    path('api/v1/course/', include('schedule.urls')),
    re_path('^media/(?P<path>.*)', serve, {'document_root': settings.MEDIA_ROOT})
]


