from django.db import models
from apps.carrera.models import Carrera
from apps.proyecto.models import Proyecto


# Create your models here.
class Estudiante(models.Model):
    noControl = models.CharField(max_length=9, primary_key=True)
    nombre = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=90)
    correo = models.CharField(max_length=100)
    telefono = models.CharField(max_length=10)
    claveCarrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, db_column='claveCarrera')
    claveProyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, db_column='claveInterna', null=True, blank=True)

    def __str__(self):
        return f"{self.noControl} - {self.nombre} {self.apellidos}"