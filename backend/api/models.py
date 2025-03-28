from django.db import models
import uuid

class User(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_name = models.CharField(max_length=100, unique=True)
    user_email = models.EmailField(unique=True)
    password = models.CharField(max_length=120) 
    last_update = models.DateField(auto_now=True)
    create_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user_name