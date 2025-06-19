from rest_framework.routers import DefaultRouter
from apps.colaboradores.api.api import ColaboradoresViewSet

router = DefaultRouter()
router.register(r'colaboradores', ColaboradoresViewSet, basename='colaboradores')

urlpatterns = router.urls