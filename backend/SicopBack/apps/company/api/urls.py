from django.urls import path, include
from rest_framework import routers
from apps.company.api import api 
from apps.company import views


router = routers.DefaultRouter()
router.register(r'addCompany', api.CompViewSet, 'addCompany')

urlpatterns = [
    path("", include(router.urls))
]