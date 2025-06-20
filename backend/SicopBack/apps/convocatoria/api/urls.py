from django.urls import path, include
from rest_framework import routers
from apps.convocatoria.views import ConvocatoriaViewSet

router = routers.DefaultRouter()
router.register(r'convocatorias', ConvocatoriaViewSet, basename='convocatoria')

urlpatterns = [
    path('', include(router.urls)),
]