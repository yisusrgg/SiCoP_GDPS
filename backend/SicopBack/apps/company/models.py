from django.db import models
from django.core.validators import RegexValidator

# Create your models here.
class company(models.Model):
    
    class sectorEn(models.TextChoices):
       public = 'PB', ('Publico')
       private = 'PV', ('Privado')
        

    rfc = models.CharField(max_length=13)
    companyName = models.CharField(max_length=255,validators=[RegexValidator(regex=r'^[a-zA-Z0-9\s\.\&\-]+$',
        message='El formato del nombre de la compañía no es válido')])
    businessName = models.CharField(max_length=255,validators=[RegexValidator(regex=r'^[a-zA-Z0-9\s\.\&\-]+$',
        message='El formato del business Name no es valido')])
    sector = models.CharField(max_length=2,choices=sectorEn.choices,default=sectorEn.public)
    companyType = models.CharField(max_length=100,validators=[RegexValidator(regex=r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\&\-]+$',
        message='El Tipo de la comañia no es valido')])