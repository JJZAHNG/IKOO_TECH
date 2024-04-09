from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LiveClass
from .serializers import LiveClassSerializer
# Create your views here.


class LiveClassViewSet(viewsets.ModelViewSet):
    queryset = LiveClass.objects.all()
    serializer_class = LiveClassSerializer

    @action(detail=True, methods=['post'])
    def toggle_live(self, request, pk=None):
        live_class = self.get_object()
        live_class.is_live = not live_class.is_live  # Toggle live status
        live_class.save()
        status = '开启' if live_class.is_live else '关闭'
        return Response({'status': f'直播间已{status}'})
