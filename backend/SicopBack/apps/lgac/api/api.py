from apps.lgac.models import Lgac
from rest_framework import viewsets, permissions
from  .serializers import LgacSerializer


class StudentViewSet(viewsets.ModelViewSet):
        queryset = Lgac.objects.all()
        permission_classes = [permissions.AllowAny]
        serializer_class = LgacSerializer
        