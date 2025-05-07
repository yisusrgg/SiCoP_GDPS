from .api.serializers import LgacSerializer
from .models import Lgac
from rest_framework import viewsets
# Create your views here.

class lgacView(viewsets.ModelViewSet):
    serializer_class = LgacSerializer
    queryset = Lgac.objects.all()