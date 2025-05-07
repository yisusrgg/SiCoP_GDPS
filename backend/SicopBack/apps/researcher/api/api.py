
from rest_framework.response import Response
from rest_framework.decorators import api_view
from apps.researcher.models import Researcher
from apps.researcher.api.serializers import ResearchSerializer
from rest_framework import viewsets, permissions,filters


class ResearcherViewSet(viewsets.ModelViewSet):
        queryset = Researcher.objects.all()
        permission_classes = [permissions.AllowAny]
        serializer_class = ResearchSerializer
        filter_backends = [filters.SearchFilter,filters.OrderingFilter]
        search_fields = ['companyName']
        ordering_fields = ['companyName']


