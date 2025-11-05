from django.urls import path, include
from rest_framework import routers
from apps.convocatoria.views import ConvocatoriaViewSet

router = routers.DefaultRouter()
router.register(r'convocatorias', ConvocatoriaViewSet, basename='convocatoria')

urlpatterns = [
    # Compatibilidad: ruta legacy usada por versiones anteriores (/call/<pk>/)
    path('call/<str:pk>/', ConvocatoriaViewSet.as_view({'get': 'retrieve'}), name='convocatoria-call'),
    path('', include(router.urls)),
]