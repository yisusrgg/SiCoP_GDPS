from rest_framework.routers import DefaultRouter
from apps.credenciales.api.api import CredencialesViewSet

router = DefaultRouter()
router.register(r'credenciales', CredencialesViewSet, basename='credenciales')

urlpatterns = router.urls