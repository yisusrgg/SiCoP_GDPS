from rest_framework.routers import DefaultRouter
from apps.estudiante.api.api import EstudianteViewSet

router = DefaultRouter()
router.register(r'estudiantes', EstudianteViewSet, basename='estudiante')

urlpatterns = router.urls