from rest_framework import viewsets
from apps.credenciales.models import Credenciales
from apps.credenciales.api.serializers import CredencialesSerializer
from apps.investigador.models import Investigador 
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


class CredencialesViewSet(viewsets.ModelViewSet):
    queryset = Credenciales.objects.all()
    serializer_class = CredencialesSerializer
    permission_classes = [IsAuthenticated]

class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            response.set_cookie(
                key='access_token',
                value=response.data['access'],
                httponly=True,
                secure=False, 
                samesite='Lax',
                path='/',
            )
        return response

class CheckAuthView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        user = request.user if request.user and request.user.is_authenticated else None
        if user:
            curp = None
            try:
                # Credenciales model links User -> Credenciales, and Investigador links to Credenciales
                cred = Credenciales.objects.filter(user=user).first()
                if cred:
                    investigador = Investigador.objects.filter(id_Credencial=cred).first()
                    if investigador:
                        curp = investigador.curp
            except Investigador.DoesNotExist:
                curp = None
            return Response({"is_authenticated": True, "user": {"username": user.username, "id": user.id, "curp": curp}})
        return Response({"is_authenticated": False}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Attempt to blacklist the refresh token (read from cookie)
        refresh_token = request.COOKIES.get('refresh')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception:
                pass
        response = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)
        # Delete cookies
        response.delete_cookie('refresh', path='/')
        response.delete_cookie('access_token', path='/')
        return response


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response({"detail": "Credenciales inválidas."}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        resp = Response({"access": access_token, "user": {"username": user.username, "id": user.id}})
        # set HttpOnly refresh cookie
        resp.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            secure=not settings.DEBUG,
            samesite='Lax',
            max_age=7*24*3600,
            path='/',
        )
        return resp


class RefreshFromCookieView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({"detail": "No refresh token"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            token = RefreshToken(refresh_token)
            new_access = str(token.access_token)
            return Response({"access": new_access})
        except Exception:
            return Response({"detail": "Token inválido"}, status=status.HTTP_401_UNAUTHORIZED)

class UserRoleView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        credencial = Credenciales.objects.filter(user=request.user).first()
        user_role = getattr(credencial, 'Rol', 'No definido') if credencial else 'No definido'
        return Response({'Rol': user_role})
