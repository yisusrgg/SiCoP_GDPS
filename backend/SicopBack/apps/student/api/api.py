from rest_framework import viewsets, permissions

from apps.student.models import Student
from apps.student.api.serializer import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = StudentSerializer
    