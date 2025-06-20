from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.credenciales.views import CredencialesViewSet

router = DefaultRouter()
router.register(r'credenciales', CredencialesViewSet, basename='credenciales')

urlpatterns = [
    path('', include(router.urls)),
]