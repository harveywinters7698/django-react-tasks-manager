from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import CategorySerializer
from .models import Category

# Create your views here.


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.categories.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
