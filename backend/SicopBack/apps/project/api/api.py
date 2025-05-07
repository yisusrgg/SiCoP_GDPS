from apps.project.models import project
from rest_framework import viewsets, permissions
from .serializer import ProjectSerializers
from rest_framework import filters  


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = project.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ProjectSerializers
    filter_backends = [filters.SearchFilter]
    search_fields = ['interCode']