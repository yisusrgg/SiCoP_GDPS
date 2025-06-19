from rest_framework import serializers
from apps.metas.models import Metas

class MetasSerialier(serializers.ModelSerializer):
    class Meta:
        model = Metas
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'idMeta': instance.idMeta,
            'nombre': instance.nombre,
            'cantidad': instance.cantidad
        }