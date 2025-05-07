from rest_framework import serializers
from apps.goalstatic.models import goalstatic
from apps.project.models import project

class GoalStaticSerializars(serializers.ModelSerializer):
    id_project = serializers.CharField(source='project.internCode', read_only=True)
    objetivesproj = serializers.CharField(source='project.objetives', read_only=True)
    class Meta:
        model = goalstatic
        fields = ('internCode','ObjetiveRepit','id_project','objetivesproj')