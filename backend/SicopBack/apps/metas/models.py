from django.db import models

class Metas(models.Model):
    idMeta = models.AutoField(primary_key=True)
    nombre = models.CharField(
        max_length=100,
        error_messages={
            'max_length': 'El nombre no puede exceder 100 caracteres.',
            'blank': 'El nombre es obligatorio.',
        }
    )
    cantidad = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre
