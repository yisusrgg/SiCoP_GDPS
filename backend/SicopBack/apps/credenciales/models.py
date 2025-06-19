from django.db import models

# Create your models here.
class Credenciales(models.Model):
    ADMINISTRADOR = 'Administrador'
    INVESTIGADOR = 'Investigador'
    ROLES = [
        (ADMINISTRADOR, 'Administrador'),
        (INVESTIGADOR, 'Investigador'),
    ]

    id_Credencial = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=256)
    Rol = models.CharField(max_length=13, choices=ROLES)

    def __str__(self):
        return f"{self.usuario} ({self.Rol})"