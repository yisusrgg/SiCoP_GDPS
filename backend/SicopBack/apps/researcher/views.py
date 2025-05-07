from rest_framework import viewsets
from .api.serializers import ResearchSerializer
from .models import Researcher 
from rest_framework import filters
# Create your views here.

class ResearcherView(viewsets.ModelViewSet):
    serializer_class = ResearchSerializer
    queryset = Researcher.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['curp']