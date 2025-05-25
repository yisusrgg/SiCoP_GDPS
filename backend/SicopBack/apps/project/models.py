from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from datetime import datetime
from apps.call.models import call
from apps.call.models import call 
from apps.company.models import company 
from apps.researcher.models import Researcher
from apps.lgac.models import Lgac
#
# Create your models here.
class project(models.Model):
    #class 
    class areaInv(models.TextChoices):
      educacion = 'ED', ("EDUCACION")
      artesyhum = 'AH', ("ARTES Y HUMANIDADES")
      cienciasS = 'SC', ("CIENCIAS SOCIALES ADMINISTRACION Y DERECHO")
      admin = 'AN', ("ADMINISTRACION Y NEGOCIOS")
      cienciasN = 'CN', ("CIENCIAS NATURALES EXACTAS Y DE LA COMPUTACION")
      TICs = 'TICs', ("TECNOLOGÍA DE LA INFORMACIÓN Y LA COMUNICACIÓN")
      ingConst = 'IMC', ("INGENIERIA MANOFACTURA Y CONSTRUCCIÓN")
      agro = 'AV', ("AGRONOMIA Y VETERINARIA")
      salud = 'SD', ("SALUD")
      serv = 'SV', ("SERVICIOS")
    
    #clave interna
    internCode = models.CharField("Clave interna", max_length=15, blank=True, editable=False)
    
    #Nombre de proyecto
    projectName = models.CharField("Nombre del proyecto", max_length=254)
    
    #Objetivos
    objetives = models.TextField("Objetivos", max_length=1000)
    
    #Resumen
    summary = models.TextField("Resumen", max_length=1000)
    
    #Area de Investigacion
    invArea = models.CharField(max_length=50,choices=areaInv.choices,default=areaInv.cienciasN )
    
    #Fecha de inicio
    dateBegin = models.DateField("Fecha de inicio",auto_now=False, auto_now_add=False)
    
    #Fecha terminacion
    dateEnd = models.DateField("Fecha de fin",auto_now=False, auto_now_add=False)
    
    #Financiamiento
    financing = models.BooleanField("Financiamiento")
    
    #Monto
    amount = models.DecimalField("Monto",max_digits=12, decimal_places=2, validators=[MinValueValidator(1000.00)], null=True, blank=True)
    
    #rfc convocatoria
    rfcCall = models.ForeignKey(call,  on_delete=models.CASCADE)
    
    #rfc compañia
    rfcCom = models.ForeignKey(company, on_delete=models.CASCADE)
    
    #LGAC
    lgac_Linea = models.ForeignKey(Lgac,  on_delete=models.CASCADE)
    
    #Lider del proyecto
    projectLeader = models.ForeignKey(Researcher,  on_delete=models.CASCADE)
    
    #Vinculado
    linked = models.BooleanField("Vinculado")
    
    #
    projectcol = models.CharField(max_length=50)
    
    def clean(self):
        if self.dateBegin and self.dateEnd and self.dateEnd < self.dateBegin:
            raise ValidationError({'dateEnd': 'La fecha de fin no puede ser anterior a la fecha de inicio.'})
    
    def save(self, *args, **kwargs):
        self.full_clean()  # Llama a clean() antes de guardar
        if not self.internCode:
            super().save(*args, **kwargs)
            year = self.dateBegin.year if self.dateBegin else datetime.now().year
            year_short = str(year)[-2:]
            self.internCode = f"itsur-pi-{year_short}-{str(self.id).zfill(2)}"
            super().save(update_fields=["internCode"])
        else:
            super().save(*args, **kwargs)
        
    def __str__(self):
       return self.projectName  
    
    