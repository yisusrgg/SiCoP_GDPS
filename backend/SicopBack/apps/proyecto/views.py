from rest_framework import viewsets
from apps.proyecto.models import Proyecto
from apps.proyecto.api.serializers import ProyectoSerializer

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer