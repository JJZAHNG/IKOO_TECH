from rest_framework.routers import SimpleRouter
from user import views
import datetime
# 定时任务
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_job
from .models import Post
from django.core.cache import cache
scheduler = BackgroundScheduler(timezone='Asia/Shanghai')
scheduler.add_jobstore(DjangoJobStore(), "default")


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
# 朋友圈系列--
# 添加评论 查询所有评论
router.register('posts', views.PostViewSet, 'posts')
# 查询所有评论
router.register('comment', views.Comment_View, 'comment')
# 点赞功能
router.register('post_like', views.LikeViewSet, 'post_like')
# 收藏功能
router.register('collect',views.CollectView,'collect')
# 个人中心
router.register('acctCenter',views.Personal_CenterView,'acctCenter')
# 修改密码修改手机号
router.register('settings',views.SettingView,'settings')
# 查询个人中心粉丝 收藏
router.register('privacy',views.PrivacyView,'privacy')
# 添加作品
router.register('addcollect',views.AddCollectView,'addcollect')



urlpatterns = [
]
urlpatterns += router.urls


def send_message():
    date_time = datetime.datetime.now().date()
    res = cache.get('11')
    ls = []
    if res is not None:
        for k,v in res.items():
            if k <= '{}'.format(date_time):
                ls.extend(v)
    queryset = Post.objects.exclude(id__in=ls)

    # 在拿到点赞数大于300的数据
    first_queryset = queryset.filter(comment_like_num__gte=300).order_by('-comment_like_num')[:3]
    # 移除后在展示没有123 大于300的数据
    id_list = [i.id for i in first_queryset]
    # 添加到缓存
    if res is not None:
        if id_list:
            res.update({'{}'.format(date_time):id_list})
        cache.set('11',res)
    else:
        cache.set('11', {})


@register_job(scheduler, "interval", days=2, id='test_job', replace_existing=True,timezone='Asia/Shanghai')
def test_job():

    send_message()
scheduler.start()