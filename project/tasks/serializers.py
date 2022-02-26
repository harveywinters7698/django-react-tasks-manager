from rest_framework import serializers
from tasks.models import Category, Task


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ['created_by']


class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        read_only=True, source='category.name'
    )
    category_color = serializers.CharField(
        read_only=True, source='category.color'
    )

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created_by']
