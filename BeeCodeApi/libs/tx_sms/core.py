import random
from tencentcloud.common import credential
from tencentcloud.sms.v20210111 import sms_client, models
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from .settings import *
import json
from BeeCodeApi.utils.common_logger import logger


# 生成一个固定长度的随机验证码
def get_code(number=4):
    code = ''
    for _ in range(number):
        random_number = random.randint(0, 9)
        code += str(random_number)
    return code


# 传入手机号和验证发送短信功能函数
def send_sms(code, mobile):
    try:
        cred = credential.Credential(SECRET_ID, SECRET_KEY)
        httpProfile = HttpProfile()
        httpProfile.reqMethod = "POST"  # post请求(默认为post请求)
        httpProfile.reqTimeout = 30  # 请求超时时间，单位为秒(默认60秒)
        httpProfile.endpoint = "sms.tencentcloudapi.com"  # 指定接入地域域名(默认就近接入)
        clientProfile = ClientProfile()
        clientProfile.signMethod = "TC3-HMAC-SHA256"  # 指定签名算法
        clientProfile.language = "en-US"
        clientProfile.httpProfile = httpProfile
        client = sms_client.SmsClient(cred, "ap-guangzhou", clientProfile)
        req = models.SendSmsRequest()
        req.SmsSdkAppId = APPID
        req.SignName = SIGN_NAME
        req.TemplateId = TEMPLATE_ID
        req.TemplateParamSet = [code, "10"]
        req.PhoneNumberSet = ["+86" + mobile]
        req.SessionContext = ""
        req.ExtendCode = ""
        req.SenderId = ""
        resp = client.SendSms(req)
        response_data_dict = json.loads(resp.to_json_string(indent=2))
        if response_data_dict.get('SendStatusSet')[0].get('Code') == 'Ok':
            return True
        else:
            logger.error('短信发送失败:%s' % str(response_data_dict.get('SendStatusSet')[0].get('Message')))
            return False
    except Exception as error:
        logger.error('短信发送异常：%s' % str(error))
        return False


if __name__ == '__main__':
    print(get_code())
