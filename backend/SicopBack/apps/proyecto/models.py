from django.db import models
from datetime import datetime
from django.core.exceptions import ValidationError
from apps.lineainvestigacion.models import LineaInvestigacion
from apps.convocatoria.models import Convocatoria
from apps.empresa.models import Empresa
from apps.investigador.models import Investigador
from apps.carrera.models import Carrera


class Proyecto(models.Model):
    claveInterna = models.CharField(max_length=25,primary_key=True, editable=False,unique=True,blank=True)
    nombreProyecto = models.CharField(
        max_length=90, 
        error_messages={
            'max_length': 'El nombre del proyecto no puede exceder 90 caracteres.',
            'blank': 'El nombre del proyecto es obligatorio.',
        }
    )
    objetivos = models.TextField(
        error_messages={
            'blank': 'Los objetivos del proyecto son obligatorios.',
        }
    )
    resumen = models.TextField(
        error_messages={
            'blank': 'El resumen del proyecto es obligatorio.',
        }
    )
    areaInvestigacion = models.CharField(max_length=175),
    fechaInicio = models.DateField(
        auto_now=False, 
        auto_now_add=False,
        error_messages={
            'blank': 'La fecha de inicio es obligatoria.',
        }
    )
    fechaFin = models.DateField(
        auto_now=False, 
        auto_now_add=False,
        error_messages={
            'blank': 'La fecha de fin es obligatoria.',
        }
    )
    FINANCIAMIENTO_CHOICES = [
        ('Si', 'Si'),
        ('No', 'No'),
    ]
    financiamiento = models.CharField(
        max_length=2, 
        choices=FINANCIAMIENTO_CHOICES,
        null=True,
        blank=True,
        default=None
    )
    monto = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
    )
    clave_convocatoria = models.ForeignKey(
        'convocatoria.Convocatoria',  
        to_field='clave_convocatoria',
        db_column='clave_convocatoria',
        on_delete=models.CASCADE,
    )
    rfc_Empresa = models.ForeignKey(
        'empresa.Empresa',
        to_field='rfc',
        db_column='rfc_Empresa',
        on_delete=models.CASCADE
    )
    lineaInvestigacion_LineaPk = models.ForeignKey(
        'lineainvestigacion.LineaInvestigacion',
        to_field='idLineaInvestigacion',
        db_column='lineaInvestigacion_LineaPk',
        on_delete=models.CASCADE
    )
    liderProyecto = models.ForeignKey(
         'investigador.Investigador',
         to_field='curp',
         db_column='liderProyecto',
         on_delete=models.CASCADE,
         null=True,   
         blank=True   
     )
    VINCULADO_CHOICES = [
        ('Si', 'Si'),
        ('No', 'No'),
    ]
    vinculado = models.CharField(
        max_length=2, 
        choices=VINCULADO_CHOICES, 
        null=True, 
        blank=True, 
        default=None
    )
    colaboradorProyecto = models.CharField(
        max_length=45, 
        null=True, 
        blank=True, 
        default=None
    )
    areaDesarrolloTec = models.CharField(
        max_length=45,
        error_messages={
            'max_length': 'El área de desarrollo tecnológico no puede exceder 45 caracteres.'
        }
    )
    desarrolloTecnologico = models.BooleanField(
        blank=True,
        null=True,
        default=None
    )
    ESTATUS_CHOICES = [
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
    ]
    estatusProyecto = models.CharField(
        max_length=8, 
        choices=ESTATUS_CHOICES, 
        null=True,
        blank=True,
        default=None
    )
    TIPO_PROYECTO_CHOICES = [
        ('Nuevo', 'Nuevo'),
        ('Continuidad', 'Continuidad')
    ]
    tipoProyecto = models.CharField(
        max_length=12, 
        choices=TIPO_PROYECTO_CHOICES, 
        null=True, 
        blank=True, 
        default=None
    )
    
    metas = models.ManyToManyField(
        'metas.Metas',
        through='MetaProyecto',
        related_name='proyectos'
    )
    
    claveCarrera = models.ForeignKey(
         'carrera.Carrera',
         to_field='claveCarrera',
         db_column='claveCarrera',
         on_delete=models.CASCADE,
         null=True,   
         blank=True
     )
    
    def save(self, *args, **kwargs):
        self.full_clean()
        if not self.claveInterna:
            year = self.dateBegin.year if self.dateBegin else datetime.now().year
            year_short = str(year)[-2:]
            count = Proyecto.objects.filter(claveInterna__startswith=f"itsur-pi-{year_short}-").count() + 1
            self.claveInterna = f"itsur-pi-{year_short}{str(count).zfill(2)}"
        super().save(*args, **kwargs)

    def clean(self):
        if self.fechaInicio and self.fechaFin and self.fechaFin < self.fechaInicio:
            raise ValidationError({'fechaFin': 'La fecha de fin no puede ser anterior a la fecha de inicio.'})

    def __str__(self):
        return self.nombreProyecto
    
class MetaProyecto(models.Model):
    proyecto = models.ForeignKey('Proyecto', on_delete=models.CASCADE)
    meta = models.ForeignKey('metas.Metas', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.proyecto} - {self.meta} ({self.cantidad})"