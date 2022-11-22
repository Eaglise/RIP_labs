from Pensione.models import *
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Categories
        # Поля, которые мы сериализуем
        fields = ["id_category", "category_name"]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ["id_service", "id_category", "service_name", "price", "image", "description"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id_user", "login", "password"]