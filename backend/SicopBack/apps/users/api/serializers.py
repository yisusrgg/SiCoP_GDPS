from rest_framework import serializers
from ..models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'name', 'last_name', 'role', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2') 
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data.get('name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'INVESTIGADOR'), 
            password=validated_data['password']
        )
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'last_name', 'role', 'is_active']
        read_only_fields = fields