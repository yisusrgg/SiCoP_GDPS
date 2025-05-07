from rest_framework import serializers
from apps.call.models import call


class CallSerializers(serializers.ModelSerializer):
    class Meta:
        model = call
        fields = '__all__'