from rest_framework import viewsets
from apps.investigador.models import Investigador
from apps.investigador.api.serializer import InvestigadorSerializer

class InvestigadorViewSet(viewsets.ModelViewSet):
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer