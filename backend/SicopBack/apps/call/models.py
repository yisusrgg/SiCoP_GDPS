from django.db import models
from django.core.validators import RegexValidator
from django.forms import ValidationError
from datetime import datetime

# Create your models here.
class call(models.Model):
    rfcCall = models.CharField(max_length=20,validators=[RegexValidator(regex=r'^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{2}[A\d])?$',
        message='El formato del RFC no es válido')])
    callN = models.CharField(max_length=50,validators=[RegexValidator(regex=r'^[a-zA-Z0-9\s\.\&\-]+$',
        message='El formato del nombre de la convocatoria no es válido')])
    callBegin = models.DateField(auto_now=False, auto_now_add=False)
    callEnd = models.DateField(auto_now=False, auto_now_add=False)
    callDesc = models.TextField(blank=True,validators=[RegexValidator(regex=r'^[\w\s\.\,\&\-]{0,200}$',
        message='El formato de la descripción no es válido')])
    
    def __str__(self):
        return self.callN
    