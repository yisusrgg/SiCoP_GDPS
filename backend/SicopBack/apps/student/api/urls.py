from django.urls import path, include
from rest_framework import routers
from apps.student import views
#from apps.student.api.api import student_detail_api_view

router = routers.DefaultRouter()
router.register(r'', views.StudentView, 'addStudent')



urlpatterns = [
    path('',include(router.urls)),
    #path('student/<int:pk>/',student_detail_api_view, name= 'estudiante_datail_api_view')
]