from .celery import app
from BeeCodeApi.libs.tx_sms import send_sms
from BeeCodeApi.utils.common_logger import logger



@app.task
def send_message(code, mobile):
    res = send_sms(code, mobile)
    if not res:
        logger.info(f'{mobile}短信发送失败')
        return False
    return '%s的短信发送成功，验证码是%s' % (mobile, code)



