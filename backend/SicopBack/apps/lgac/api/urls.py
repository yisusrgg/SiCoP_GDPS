from django.urls import path, include
from rest_framework import routers
from apps.lgac import views

router = routers.DefaultRouter()
router.register(r'', views.lgacView, 'addlgac')

urlpatterns = [
    path("", include(router.urls))
]
