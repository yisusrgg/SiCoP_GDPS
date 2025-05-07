from django.db import models
from django.core.validators import RegexValidator

# Create your models here.

class Researcher(models.Model):
    curp = models.CharField(max_length=18,validators=[RegexValidator(regex=r'^[A-Z]{4}[0-9]{6}[A-Z]{7}[0-9]{1}$',
        message='El formato de CURP no es válido')])
    name = models.CharField(max_length=255,validators=[RegexValidator(regex=r'^[a-zA-Z\s]*$',
        message="El nombre solo puede contener letras y espacios.")])
    last_name = models.CharField(max_length=50,validators=[RegexValidator(regex=r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$',
        message='El formato del apellido no es válido')])
    career = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name