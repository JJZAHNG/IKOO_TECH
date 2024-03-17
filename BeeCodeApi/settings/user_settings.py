# 用户自己的配置
BANNER_COUNT = 4

# 后端项目地址
BACKEND_URL = 'http://127.0.0.1:8000'

# 上线后必须换成公网地址
# 前台基URL
LUFFY_URL = 'http://127.0.0.1'
# 支付宝同步异步回调接口配置
# 后台异步回调接口
NOTIFY_URL = BACKEND_URL + "/order/success/"
# 前台同步回调接口，没有 / 结尾
RETURN_URL = LUFFY_URL + "/pay/success"
