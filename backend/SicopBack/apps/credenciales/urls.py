from django.urls import path
from .views import UserRoleView, LogoutView

urlpatterns = [
    path('rol/', UserRoleView.as_view(), name='user_role'),
    path('logout/', LogoutView.as_view(), name='logout'),
]