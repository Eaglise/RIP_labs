from Pensione.models import *
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Category
        # Поля, которые мы сериализуем
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class ExtServiceSerializer(serializers.ModelSerializer):
   id_category = CategorySerializer(read_only=True)
   class Meta:
      model = Service
      # fields=['id_service','service_name', 'id_category', 'price', 'image', 'description']
      fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined']


class ExtOrderSerializer(serializers.ModelSerializer):
   status = StatusSerializer(read_only=True)
   id_manager = WorkerSerializer(read_only=True)
   id_client = UserSerializer(read_only=True)
   class Meta:
      model = Order
      # fields = ['id_order', 'id_status', 'order_date', 'sum']
      fields = '__all__'


class ExtChoiceSerializer(serializers.ModelSerializer):
   id_service = ExtServiceSerializer(read_only=True)
   id_worker = WorkerSerializer(read_only=True)
   id_order = ExtOrderSerializer(read_only=True)
   class Meta:
      model = Choice
      fields = '__all__'



class LoginRequestSerializer(serializers.Serializer):
    model = User
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
