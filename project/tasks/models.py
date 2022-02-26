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


class Task(models.Model):

    class Priority(models.IntegerChoices):
        LOW = 1, "Low"
        MEDIUM = 2, "Medium"
        HIGH = 3, "High"
        CRITICAL = 4, "Critical"

    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    priority = models.PositiveSmallIntegerField(
        choices=Priority.choices,
        default=Priority.MEDIUM
    )
    category = models.ForeignKey(
        Category, related_name="tasks", on_delete=models.CASCADE)
    created_by = models.ForeignKey(
        User, related_name="tasks", on_delete=models.CASCADE)
