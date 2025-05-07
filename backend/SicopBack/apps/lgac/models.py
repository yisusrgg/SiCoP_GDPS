from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class Lgac(models.Model):
     
     class RegisterIn(models.TextChoices):
            TecNM = 'TecNM', ('Tecnologico de Mexico')
            Prodep = 'PRODEP-CA', ('PRODEP')  
                
     idLine = models.CharField(max_length=25)
     name = models.CharField(max_length=255,validators=[RegexValidator(regex=r'^[a-zA-Z0-9\s\.\&\-]+$',
        message='El formato del nombre de la compañía no es válido')])
     career = models.CharField(max_length=252,validators=[RegexValidator(regex=r'^Ingeniería\s[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\&\-]+$',
        message='El formato del nombre de la carrera de ingeniería no es válido')])
     instituto = models.CharField(max_length=30,choices=RegisterIn.choices,default=RegisterIn.TecNM)
    

     def __str__(self):
        ##Vizualizador por defecto de un modelo
        return  f'{self.name}'