from rest_framework import serializers
from apps.empresa.models import Empresa

class EmpresaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'rfc': instance.rfc,
            'razonSocial': instance.razonSocial,
            'sector': instance.sector
        }