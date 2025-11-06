from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator

ROLES = (
    ('ADMIN', 'Administrador'),
    ('INVESTIGADOR', 'Investigador'), 
)

class UserManager(BaseUserManager):
    def _create_user(self, username, email, name, last_name, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un email')
        email = self.normalize_email(email)
        
        user = self.model(
            username = username,
            email = email,
            name = name,
            last_name = last_name,
            is_staff = is_staff,
            is_superuser = is_superuser,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user 
    
    def create_user(self, username, email, name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('role', 'INVESTIGADOR')
        return self._create_user(username, email, name, last_name, password, False, False, **extra_fields)
    
    def create_superuser(self, username, email, name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('role', 'ADMIN') 
        return self._create_user(username, email, name, last_name, password,True, True, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField('Correo Electronico',max_length=255,unique=True)
    name = models.CharField('Nombres', max_length=255, blank=True,null=True,validators=[RegexValidator(regex=r'^[a-zA-Z\s]*$',
        message="El nombre solo puede contener letras y espacios.")])
    last_name = models.CharField('Apellidos', max_length=255, blank=True,null=True,validators=[RegexValidator(regex=r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$',
        message='El formato del apellido no es válido')])
    
    role = models.CharField(
        max_length=15, 
        choices=ROLES,
        default='INVESTIGADOR',
        verbose_name='Rol del Usuario'
    )
    
    image = models.ImageField('Foto de perfil', upload_to='perfil/',max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    
    is_staff = models.BooleanField(default=False) 
    
    objects = UserManager()
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural  = 'Usuarios'
        
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','name','last_name'] 
    
    def natural_key(self):
        return (self.username) 
    
    def __str__(self):
        # El visualizador ahora incluye el rol
        return f'{self.name} {self.last_name} ({self.get_role_display()})'