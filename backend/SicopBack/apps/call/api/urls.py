from django.urls import path, include
from rest_framework import routers
from apps.call.api import api

router = routers.DefaultRouter()
router.register(r'', api.CallViewSet, 'addCall')


urlpatterns = [
    path("", include(router.urls))
]
