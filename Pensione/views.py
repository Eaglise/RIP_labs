from rest_framework import viewsets
from Pensione.serializers import *
from Pensione.models import *


class CategoryViewSet(viewsets.ModelViewSet):  # TODO
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer


class ServiceViewSet(viewsets.ModelViewSet):  # TODO
    queryset = Services.objects.all()
    serializer_class = ServiceSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
