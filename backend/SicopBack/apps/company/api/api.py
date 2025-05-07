from apps.company.models import company
from rest_framework import viewsets, permissions, filters
from .serializers import CompanySerializers



class CompViewSet(viewsets.ModelViewSet):
    queryset = company.objects.all()
    serializer_class = CompanySerializers
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['companyName']
    ordering_fields = ['companyName']

 