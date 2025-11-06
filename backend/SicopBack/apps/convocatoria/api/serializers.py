from rest_framework import serializers
from apps.convocatoria.models import Convocatoria
from django.utils import timezone


class ConvocatoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convocatoria
        fields = '__all__'

    def validate(self, data):
        activar = data.get('activa', None)
        fecha_inicio = data.get('fechaInicioConvocatoria')
        fecha_fin = data.get('fechaFinConvocatoria')

        if self.instance:
            fecha_inicio = fecha_inicio or getattr(self.instance, 'fechaInicioConvocatoria', None)
            fecha_fin = fecha_fin or getattr(self.instance, 'fechaFinConvocatoria', None)

        if fecha_inicio is None or fecha_fin is None:
            fecha_inicio = fecha_inicio or data.get('fechaInicioFinanciamiento')
            fecha_fin = fecha_fin or data.get('fechaFinFinanciamiento')
            if self.instance and (fecha_inicio is None or fecha_fin is None):
                fecha_inicio = fecha_inicio or getattr(self.instance, 'fechaInicioFinanciamiento', None)
                fecha_fin = fecha_fin or getattr(self.instance, 'fechaFinFinanciamiento', None)

        if activar is True or (self.instance and self.instance.activa):
            if fecha_inicio is None or fecha_fin is None:
                raise serializers.ValidationError({
                    'activa': 'La convocatoria debe tener fecha de inicio y fin para activarse.'
                })

            hoy = timezone.now().date()
            if not (fecha_inicio <= hoy <= fecha_fin):
                raise serializers.ValidationError({
                    'activa': 'No se puede tener una convocatoria activa fuera del rango de fechas.'
                })
        return data
