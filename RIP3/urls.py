"""RIP3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from Pensione import views as views
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'categories', views.CategoryViewSet, basename='categories')
router.register(r'services', views.ServiceViewSet, basename='services')
router.register(r'users', views.UserViewSet, basename='users')
router.register(r'clients', views.ClientViewSet, basename='clients')
router.register(r'workers', views.WorkerViewSet, basename='workers')
router.register(r'status', views.StatusViewSet, basename='status')
router.register(r'choice', views.ChoiceViewSet, basename='choice')
router.register(r'order', views.OrderViewSet, basename='order')
router.register(r'curr_order', views.CurrOrdViewSet, basename='curr_order')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('admin/', admin.site.urls),
    path(r'min_max_price', views.min_max_price)
]
