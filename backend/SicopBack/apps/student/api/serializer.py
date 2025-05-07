from rest_framework import serializers
from apps.student.models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'name' : instance.name,
            'last_name' : instance.last_name,
            'controlN' : instance.controlN,
            'semester' : instance.semester,
            "career" : instance.career            
        }
         
      