from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, related_name="categories", on_delete=models.CASCADE)
