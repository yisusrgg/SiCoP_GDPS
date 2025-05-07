from rest_framework import serializers
from apps.company.models import company

class CompanySerializers(serializers.ModelSerializer):
    class Meta:
        model = company
        fields = '__all__'

def to_representation(self, instance):
      return {
            'rfc' : instance.rfc,
            'companyName' : instance.companyName,
            'businessName' : instance.businessName,
            'sector' : instance.sector,
            'companyType' : instance.companyType
        } 