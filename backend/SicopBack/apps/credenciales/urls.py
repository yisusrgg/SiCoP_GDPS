from django.urls import path
from .views import UserRoleView, LogoutView, LoginView, RefreshFromCookieView, CheckAuthView

urlpatterns = [
    path('rol/', UserRoleView.as_view(), name='user_role'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshFromCookieView.as_view(), name='token_refresh_cookie'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-auth/', CheckAuthView.as_view(), name='check_auth'),
]