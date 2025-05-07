from django.shortcuts import render

# Create your views here.
from apps.company.models import company
from rest_framework import viewsets, permissions, filters
from .api.serializers import CompanySerializers



class CompViewSet(viewsets.ModelViewSet):
    queryset = company.objects.all()
    serializer_class = CompanySerializers
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['companyName']
    ordering_fields = ['companyName']