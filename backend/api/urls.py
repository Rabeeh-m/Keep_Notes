from django.urls import path
from .views import RegisterView, LoginView, NoteListCreateView, NoteDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/<uuid:note_id>/', NoteDetailView.as_view(), name='note-detail'),
]