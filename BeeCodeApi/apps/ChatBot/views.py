from rest_framework.viewsets import ViewSet
from utils.common_response import APIResponse
from rest_framework.decorators import action
BOT_RESPONSE_DICT = {
        1:"This is code 1 response!",
        2:"This is code 2 response!",
        3:"This is code 3 response!",
        4:"This is code 4 response!",
        5:"This is code 5 response!",
        6:"This is code 6 response!",
        7:"This is code 7 response!",
        8:"This is code 8 response!",
        9:"This is code 9 response!"
        }
ERROR_MSG = "PLEASE ENTER THE CORRECT CODE"




class BotChat(ViewSet):

    @action(methods=['POST'], detail=False)
    def bot(self, request, *args, **kwargs):
        # 获取前端传递的文本数据
        text_data = request.data.get('text', None)
        print(type(text_data))
        try:
            if text_data and int(text_data) in BOT_RESPONSE_DICT.keys():
                return APIResponse(code=200, msg=BOT_RESPONSE_DICT.get(int(text_data)))
            else:
                return APIResponse(code=850, msg=ERROR_MSG)
        except Exception as e:
            e = str(e)
            return APIResponse(code=860, msg=e)
