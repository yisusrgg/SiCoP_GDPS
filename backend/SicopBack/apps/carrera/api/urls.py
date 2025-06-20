from django.urls import path
from apps.carrera.views import CarreraListCreateAPIView, CarreraRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', CarreraListCreateAPIView.as_view(), name='carrera-list-create'),  
 ]