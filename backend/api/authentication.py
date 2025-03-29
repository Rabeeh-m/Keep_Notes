from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User
from django.contrib.auth.hashers import check_password

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token['user_id']
            return User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return None