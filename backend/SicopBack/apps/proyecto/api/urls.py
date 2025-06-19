from rest_framework.routers import DefaultRouter
from .api import ProyectoViewSet

router = DefaultRouter()
router.register(r'proyectos', ProyectoViewSet, basename='proyectos')

urlpatterns = router.urls