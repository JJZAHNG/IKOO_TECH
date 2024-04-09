from django.db import models
from django.contrib.auth.models import User

class LiveClass(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='live_classes')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_live = models.BooleanField(default=False)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    # 如果使用第三方流媒体服务，可能需要存储直播流信息
    stream_url = models.URLField(blank=True)

    def __str__(self):
        return self.title
