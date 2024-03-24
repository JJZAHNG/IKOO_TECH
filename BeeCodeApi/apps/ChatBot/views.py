from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import eurine4

class BotChat(APIView):
    def post(self, request, *args, **kwargs):
        # 获取前端传递的文本数据
        text_data = request.data.get('text', None)

        # 确保文本数据存在
        if text_data is None:
            return Response(
                {"error": "No text provided"},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            result = eurine4.eurine_response(text_data)
            # 返回响应
            return Response(
                {"message": "Text received", "text": result},
                status=status.HTTP_200_OK
            )
