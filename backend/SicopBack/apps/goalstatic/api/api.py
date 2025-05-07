from apps.goalstatic.models import goalstatic
from rest_framework import viewsets, permissions
from .serializer import GoalStaticSerializars
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

class GoalStaticViewSet(viewsets.ModelViewSet):
    queryset= goalstatic.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = GoalStaticSerializars

@api_view(['GET'])
def result(request):
    serializer = GoalStaticSerializars(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)