from rest_framework import viewsets
from apps.project.models import Project
from apps.project.api.serializer import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):  # Asegúrate de usar ModelViewSet
    queryset = Project.objects.all()  # Devuelve todos los objetos del modelo Project
    serializer_class = ProjectSerializer  # Usa el serializador para manejar los datos