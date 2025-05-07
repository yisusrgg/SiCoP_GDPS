"""
URL configuration for SicopBack project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuario/', include('apps.users.api.urls')),
    path('student/', include('apps.student.api.urls')),
    path('researcher/', include('apps.researcher.api.urls')),
    path('lgac/', include('apps.lgac.api.urls')),
    path('call/', include('apps.call.api.urls')),
    path('goals/', include('apps.goals.api.urls')),
    path('company/', include('apps.company.api.urls')),
    path('projects/', include('apps.project.api.urls')),  # Mantén solo esta línea para proyectos
    path('Files/', include('apps.Files.api.urls')),
    path('goalstatic/', include('apps.goalstatic.api.urls')),
]