from rest_framework import routers
from .views import CategoryViewSet, TaskViewSet, DashboardTaskCompletionStatViewSet, DashboardTaskByCategoryViewSet

router = routers.DefaultRouter()
router.register(r'api/categories', CategoryViewSet, 'categories')
router.register(r'api/tasks', TaskViewSet, 'tasks')
router.register('api/dashboard/tasks-completion',
                DashboardTaskCompletionStatViewSet, 'tasks-completion')
router.register('api/dashboard/tasks-category-distribution',
                DashboardTaskByCategoryViewSet, 'tasks-category-distribution')

urlpatterns = router.urls
