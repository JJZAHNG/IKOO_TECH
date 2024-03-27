# BeeCode App 研发

## 💻研发团队

前端：JACKY LI, JJ ZHANG

后端：JJ ZHANG， HAONAN TIAN， CHANGSHAN SHI

设计：JACK WANG

财务：Atyuki Tang

项目负责人：JJZHANG


## 📌API接口文档
Apifox 下载链接：
https://apifox.com/

Apifox 帮助文档：
https://apifox.com/help/team/managing-team

Apifox 团队邀请：
狼哥 has invited you to join a team BeeCode研发 on Apifox https://app.apifox.com/invite?token=M_hgjxxY6CCu_PK8_hUqv

## Github 操作

```python
git init
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/JJZAHNG/IKOO_TECH.git
git push -u origin main
```
# 项目需求及其测试
### 注意事项1.返回的失败格式是字典套msg 需要查看
### 注意事项2.有问题及时联系
### 注意事项3.如果出现url正确404问题 联系后端有解决方案



1.校验手机号是否存在数据库接口
http://127.0.0.1:8000/api/v1/user/mul_login/verify_mobile/
get请求
参数为1个
mobile   手机号
需要添加限制条件 必须是数字 并且 正则11位限制 可后端编写 后端没编写
返回 成功code=100 msg=成功  失败code=800 msg=drf异常

2.发送短信接口
http://127.0.0.1:8000/api/v1/user/mul_login/verify_mobile/
post请求
参数为1个
mobile    手机号
返回 成功code=100 msg=发送短信成功  失败code=800 msg=drf异常


3.用户账号密码注册
http://127.0.0.1:8000/api/v1/user/user_register/user_register/
post请求
参数为3个
username       用户名
password       密码
tow_password   第二个密码
条件 password 必须大于8位字符否则报错  password与tow_password必须一直否则报错 
异常状态码 code=800  
成功返回注册成功 code=100


4.用户手机号注册  手机号注册没有密码 username就是当前手机号
http://127.0.0.1:8000/api/v1/user/mobile_register/mobile_registration/
post请求
参数为2个
mobile   手机号
code     验证码   万能验证码字符串的1111  目前没有短信
限制     输入手机号 查询手机是否存在
返回     注册成功code=100 其他 手机号已存在code=800



5.用户登录
手机号登录  登录前校验手机号是否存在 然后发送短信
http://127.0.0.1:8000/api/v1/user/login/sms_login/
post请求
参数2个
mobile   手机号
code     验证码  1111
条件 '^1[3-9]\d{9}$' 手机号格式  内部限制  
返回  成功code=100 msg=成功 usenrname(用户名), token, icon(头像)


6.账号密码登录
http://127.0.0.1:8000/api/v1/user/login/mul_login/
post请求
参数2个
username       用户名
password       密码
条件  成功返回code=100 msg=成功 usenrname(用户名), token, icon(头像)  
      失败返回code=800 msg=账号密码错误