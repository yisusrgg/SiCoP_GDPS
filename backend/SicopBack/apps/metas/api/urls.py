from django.urls import path, include
from rest_framework import routers
from apps.metas.api import api

router = routers.DefaultRouter()
router.register(r'', api.MetasViewSet, '')


urlpatterns = [
    path("", include(router.urls))
]
 