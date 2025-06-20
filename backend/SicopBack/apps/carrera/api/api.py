from rest_framework import viewsets
from apps.carrera.models import Carrera
from backend.SicopBack.apps.carrera.api.serializers import CarreraSerializer

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer