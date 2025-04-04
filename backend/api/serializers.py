from rest_framework import serializers
from .models import User, Note
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'user_name', 'user_email', 'password', 'last_update', 'create_on']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class LoginSerializer(serializers.Serializer):
    user_email = serializers.EmailField()
    password = serializers.CharField()
    
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['note_id', 'note_title', 'note_content', 'last_update', 'created_on', 'user']
        extra_kwargs = {'user': {'read_only': True}}