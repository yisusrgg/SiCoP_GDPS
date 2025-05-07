from django.db import models
from django.core.validators import RegexValidator

# Create your models here.

class Student(models.Model):
    
    name = models.CharField("Nombre", max_length=255,validators=[RegexValidator(regex=r'^[a-zA-Z\s]*$',
        message="El nombre solo puede contener letras y espacios.")])
    last_name = models.CharField("Apellido", max_length=255,validators=[RegexValidator(regex=r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$',
        message='El formato del apellido no es válido')])
    controlN = models.CharField("Numero de control", max_length=9, default='---------')
    semester = models.CharField("Semestre", max_length=50, default='1er semestre')
    career = models.CharField("Carrera", max_length=255, default= 'Sistemas computacionales')
    # Letras de carrera A C D E G M S T
   
   # def __str__(self):
   #     ##Vizualizador por defecto de un modelo
   #     return  f'{self.name} {self.last_name}'
    
    
    @property
    def _history_user(self):
        return self.changed_by
    
    @_history_user.setter
    def _history_user(self,value):
        self.changed_by = value

    class Meta:
        verbose_name = "Estudiante"
        verbose_name_plural = "Estudiantes"
   
    def __str__(self):
        ##Vizualizador por defecto de un modelo
        return  f'{self.name} {self.last_name}'