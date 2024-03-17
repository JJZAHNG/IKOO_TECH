from rest_framework.views import exception_handler
from rest_framework.response import Response
from utils.common_logger import logger

def common_exception_handler(exc, context):
    res = exception_handler(exc, context)

    # 有值 drf异常 处理返回格式
    if res:
        err = res.data.get('detail') or res.data or '未知错误'
        response = Response({'code': 800, 'msg': '请求异常-drf:%s' % err})

    # 其他异常 自己处理
    else:
        response = Response({'code': 900, 'msg': '请求异常-非drf:%s' % str(exc)})

    # 记录日志，越详细越好,  请求错误：请求地址是：%s，请求方式是：%s，请求用户ip地址是：%s,用户id是：%s,错误是：%s，执行的视图函数是：%s
    request = context.get('request')
    path = request.get_full_path()
    method = request.method
    ip = request.META.get('REMOTE_ADDR')
    user_id = request.user.pk or '未登陆'
    err = str(exc)
    view = str(context.get('view'))
    logger.error(
        '请求错误：请求地址是：%s，请求方式是：%s，请求用户ip地址是：%s，用户id是：%s，错误是：%s，执行的视图函数是：%s' % (
            path, method, ip, user_id, err, view))

    return response
