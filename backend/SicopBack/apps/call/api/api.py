from  apps.call.models import call
from rest_framework import viewsets, permissions
from .serializers import CallSerializers


class CallViewSet(viewsets.ModelViewSet):
    queryset= call.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CallSerializers