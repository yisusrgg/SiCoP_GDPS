from django.urls import path
from .api import UserRegisterView, UserDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    path('register/', UserRegisterView.as_view(), name='user_register'),
    path('me/', UserDetailView.as_view(), name='user_detail'),
    #path('usuario/',UserAPIview,name='usuario_api'),
    #path('usuario/<int:pk>/',user_datail_api_view, name = 'usuario_datail_api_view'),
    
]