from rest_framework import permissions
from tasks.models import Category


class TaskPermission(permissions.BasePermission):
    message = 'Category not found'

    def has_permission(self, request, view):
        print(view.action)
        if view.action == 'create' or view.action == 'update' or view.action == 'partial_update':
            category = request.data.get('category')
            if category is None:
                return True
            user_categories = Category.objects.filter(
                created_by=request.user).values_list('id', flat=True)
            if not category in user_categories:
                return False

        return True
