from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserDetailSerializer # Asume que tienes este Serializer
from ..models import User 


class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer 
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            return Response({
                "message": "Usuario registrado exitosamente.",
                "user_id": user.id,
                "username": user.username
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user