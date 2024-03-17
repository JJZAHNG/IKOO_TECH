from django.utils.deprecation import MiddlewareMixin


class CORSMiddlewareMixin(MiddlewareMixin):
    def process_response(self, request, response):
        # 简单请求
        response['Access-Control-Allow-Origin'] = '*'

        # 非简单请求
        if request.method == 'OPTIONS':
            response['Access-Control-Allow-Methods'] = '*'
            response['Access-Control-Allow-Headers'] = '*'

        return response
