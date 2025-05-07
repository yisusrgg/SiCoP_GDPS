from django.urls import path, include
from rest_framework import routers
from apps.researcher import views
#from apps.researcher.api.api import researcher_detail_api_view#, ResearcherApiView

router = routers.DefaultRouter()
router.register(r'', views.ResearcherView, 'addResearcher')

urlpatterns = [
    path("", include(router.urls)),
   #  path('researcher/<int:pk>/', researcher_detail_api_view, name= 'investigador_detail_api_view')
]
