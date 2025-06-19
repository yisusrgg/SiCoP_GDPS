from django.urls import path, include
from rest_framework import routers
from .api import LineaInvestigacionViewSet

router = routers.DefaultRouter()
router.register(r'', LineaInvestigacionViewSet, 'addlineainvestigacion')

urlpatterns = [
    path("", include(router.urls))
]


# router.register(r'lineas', LineaInvestigacionViewSet, 'addlineainvestigacion')
