from rest_framework import generics
from .models import Carrera
from apps.carrera.api.serializer import CarreraSerializer

class CarreraListAPIView(generics.ListAPIView):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer