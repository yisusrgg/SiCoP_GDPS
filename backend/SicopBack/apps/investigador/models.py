from django.db import models
from apps.carrera.models import Carrera
from apps.credenciales.models import Credenciales

# Create your models here.
class Investigador(models.Model):
    curp = models.CharField(max_length=18, primary_key=True)
    nombre = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=90)
    correo = models.CharField(max_length=100)
    fecha_registro = models.DateField()
    claveCarrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, db_column='claveCarrera')
    id_Credencial = models.ForeignKey(Credenciales, on_delete=models.CASCADE, db_column='id_Credencial')

    def __str__(self):
        return f"{self.nombre} {self.apellidos} ({self.curp})"