from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer, NoteSerializer
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Note
from rest_framework.permissions import IsAuthenticated,AllowAny
import jwt
from django.conf import settings

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user_email = serializer.validated_data['user_email']
            password = serializer.validated_data['password']
            try:
                user = User.objects.get(user_email=user_email)
                if check_password(password, user.password):
                    refresh = RefreshToken()
                    refresh['user_id'] = str(user.user_id) 
                    access = refresh.access_token
                    return Response({
                        'refresh': str(refresh),
                        'access': str(access),
                        'user_id': str(user.user_id),
                        'user_name': user.user_name
                    })
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class NoteListCreateView(APIView):

    def get(self, request):
        token = request.headers.get('Authorization', '').split('Bearer ')[-1]
        try:
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded['user_id']
            user = User.objects.get(user_id=user_id)
        except (jwt.InvalidTokenError, User.DoesNotExist, KeyError):
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        notes = Note.objects.filter(user=user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        token = request.headers.get('Authorization', '').split('Bearer ')[-1]
        try:
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded['user_id']
            user = User.objects.get(user_id=user_id)
        except (jwt.InvalidTokenError, User.DoesNotExist, KeyError):
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        print("Authenticated user ID from token:", user_id)  # Debug
        data = request.data.copy()
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)  # Pass the User object directly
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Serializer errors:", serializer.errors)  # Debug
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class NoteDetailView(APIView):
    permission_classes = [AllowAny]
    def get_object(self, note_id, user):
        try:
            return Note.objects.get(note_id=note_id, user=user)
        except Note.DoesNotExist:
            return None

    def get(self, request, note_id):
        note = self.get_object(note_id, request.user)
        if not note:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, note_id):
        note = self.get_object(note_id, request.user)
        if not note:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = NoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, note_id):
        note = self.get_object(note_id, request.user)
        if not note:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)