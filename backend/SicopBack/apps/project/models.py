from django.db import models

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
    internCode = models.CharField("Calve interna", max_length=15)
    
    #Nombre de proyecto
    projectName = models.CharField("Nombre del proyecto", max_length=254)
    
    #Objetivos
    objetives = models.TextField("Objetivos")
    
    #Resumen
    summary = models.TextField("Resumen")
    
    #Area de Investigacion
    invArea = models.CharField(max_length=50,choices=areaInv.choices,default=areaInv.cienciasN )
    
    #Fecha de inicio
    dateBegin = models.DateField("Fecha de inicio",auto_now=False, auto_now_add=False)
    
    #Fecha terminacion
    dateEnd = models.DateField("Fecha de inicio",auto_now=False, auto_now_add=False)
    
    #Financiamiento
    financing = models.BooleanField("Financiamiento")
    
    #Monto
    amount = models.DecimalField("Monto",max_digits=5, decimal_places=2)
    
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
    
    def __str__(self):
       return self.projectName  
    
    