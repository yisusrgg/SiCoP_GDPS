from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets,permissions
from .api.serializer import StudentSerializer
from .models import Student
from rest_framework import filters  
# Create your views here.

class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter,filters.OrderingFilter]
    search_fields = ['controlN']
    ordering_fields = ['name']
    