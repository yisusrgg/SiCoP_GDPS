from django.urls import path, include
from rest_framework import routers
from apps.goalstatic.api import api

router = routers.DefaultRouter()
router.register(r'addGoalstatic', api.GoalStaticViewSet, 'addGoalStatic')

urlpatterns = [
     path("",include(router.urls))
]
