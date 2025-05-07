from apps.goals.models import Goals
from rest_framework import viewsets, permissions
from .serializers import GoalSerialier

class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goals.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = GoalSerialier