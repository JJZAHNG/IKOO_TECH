from rest_framework.response import Response


class APIResponse(Response):
    def __init__(self, code=100, msg='成功', status=None,
                 template_name=None, headers=None,
                 exception=False, content_type=None, **kwargs):
        data = {'code': code, 'msg': msg}
        if kwargs:
            data.update(kwargs)

        super().__init__(data=data, status=status, headers=headers, template_name=template_name, exception=exception,
                         content_type=content_type)
