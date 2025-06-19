from apps.proyecto.models import Proyecto
from rest_framework import viewsets, permissions
from .serializer import ProyectoSerializer
from rest_framework import filters  

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProyectoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombreProyecto']