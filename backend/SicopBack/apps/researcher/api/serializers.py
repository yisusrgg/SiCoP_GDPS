from rest_framework import serializers
from apps.researcher.models import Researcher


class ResearchSerializer(serializers.ModelSerializer):
        class Meta:
            model = Researcher
            fields = '__all__'

# Revisar bien que es self
def to_representation(self, instance):
      return {
            'curp' : instance.curp,
            'name' : instance.name,
            'last_name' : instance.last_name,
            'career' : instance.career
      }