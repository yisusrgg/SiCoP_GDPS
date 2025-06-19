from django.urls import path, include
from rest_framework import routers
from apps.convocatoria.api import api 

router = routers.DefaultRouter()
router.register(r'addConvocatoria', api.ConvocatoriaViewSet, 'addConvocatoria')

urlpatterns = [
    path("", include(router.urls))
]