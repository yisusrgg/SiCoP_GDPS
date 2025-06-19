from django.urls import path, include
from rest_framework import routers
from apps.empresa.api import api


router = routers.DefaultRouter()
router.register(r'addEmpresa', api.EmpresaViewSet, 'addEmpresa')

urlpatterns = [
    path("", include(router.urls))
]