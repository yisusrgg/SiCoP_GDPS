from rest_framework import viewsets
from apps.colaboradores.models import Colaboradores
from apps.colaboradores.api.serializer import ColaboradoresSerializer

class ColaboradoresViewSet(viewsets.ModelViewSet):
    queryset = Colaboradores.objects.all()
    serializer_class = ColaboradoresSerializer