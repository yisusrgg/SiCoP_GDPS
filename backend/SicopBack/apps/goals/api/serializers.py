from rest_framework import serializers
from apps.goals.models import Goals

class GoalSerialier(serializers.ModelSerializer):
    class Meta:
        model = Goals
        fields = '__all__'