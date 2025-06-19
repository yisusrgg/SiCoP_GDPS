from django.db import models
from apps.investigador.models import Investigador
from apps.proyecto.models import Proyecto

class Colaboradores(models.Model):
    idcolaboradores = models.AutoField(primary_key=True)
    investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE, related_name='colaboraciones')
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, related_name='colaboradores')

    def __str__(self):
        return f"Colaborador {self.idcolaboradores} - {self.investigador} en {self.proyecto}"