from celery import Celery
from datetime import timedelta
import os

# 加载django 配置
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BeeCodeApi.settings.dev')
broker = 'redis://127.0.0.1:6379/0'
backend = 'redis://127.0.0.1:6379/1'
include = ['celery_task.user_task']
app = Celery('app', broker=broker, backend=backend, include=include)

# 配置国际化
app.conf.timezone = 'Asia/Shanghai'

# 是否使用utc时间
app.conf.enable_utc = False

# 定制任务
app.conf.beat_schedule = {
    'update_cache': {
        'task': 'celery_task.home_task.update_cache',
        'schedule': timedelta(seconds=10),
        'args': (),
    },

}
