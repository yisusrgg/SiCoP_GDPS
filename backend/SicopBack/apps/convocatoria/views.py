from rest_framework import viewsets
from apps.convocatoria.models import Convocatoria
from apps.convocatoria.api.serializers import ConvocatoriaSerializer

class ConvocatoriaViewSet(viewsets.ModelViewSet):
    queryset = Convocatoria.objects.all()
    serializer_class = ConvocatoriaSerializer