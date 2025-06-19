from rest_framework.routers import DefaultRouter
from apps.investigador.api.api import InvestigadorViewSet

router = DefaultRouter()
router.register(r'investigadores', InvestigadorViewSet, basename='investigador')

urlpatterns = router.urls