from rest_framework import serializers
from apps.lgac.models import Lgac

class LgacSerializer(serializers.ModelSerializer):
        class Meta:
            model = Lgac
            fields = '__all__'