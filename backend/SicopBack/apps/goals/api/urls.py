from django.urls import path, include
from rest_framework import routers
from apps.goals.api import api

router = routers.DefaultRouter()
router.register(r'', api.GoalViewSet, '')


urlpatterns = [
    path("", include(router.urls))
]
 