
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/bot/', include("ChatBot.urls")),
    path('api/v1/user/',include('user.urls')),
    path('api/v1/course/', include('schedule.urls'))
]
