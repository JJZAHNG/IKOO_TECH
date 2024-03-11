import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from ..ChatBot import AiChatter

# Create your views here.

def get_response(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prompt = data['text']
            AiBot = AiChatter()
            response = AiBot.get_response(prompt)
            return JsonResponse({'code': 200, 'message': 'response'})
        except BaseException:
            return JsonResponse({'code': 5020, 'message': '你好，有什么可以帮助您的？'})