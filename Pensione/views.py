from rest_framework import viewsets
from Pensione.serializers import *
from Pensione.models import *
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Min, Max


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class WorkerViewSet(viewsets.ModelViewSet):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


@api_view(['GET'])
def min_max_price(request):
   return Response(Service.objects.aggregate(max_price=Max('price'), min_price=Min('price')))


class ServiceViewSet(viewsets.ModelViewSet):
   serializer_class = ServiceSerializer

   def get_queryset(self):
      queryset =Service.objects.all()
      if self.request.method == 'GET':
         params = self.request.query_params.dict()
         if 'min' in params and 'max' in params and 'search' in params:
            queryset = Service.objects.filter(
               price__lte=params['max'],
               price__gte=params['min'],
               service_name__icontains=params['search']
            )
         elif 'min' in params and 'max' in params:
            queryset = Service.objects.filter(price__lte=params['max'], price__gte=params['min'])

         elif 'search' in params:
            queryset = Service.objects.filter(service_name__icontains=params['search'])

      return queryset


class OrderViewSet(viewsets.ModelViewSet):
   def get_serializer(self, *args, **kwargs):
      params = self.request.query_params.dict()
      if 'user' in params and 'old' in params:
         serializer_class = ExtOrderSerializer
      else:
         serializer_class = OrderSerializer
      kwargs['context'] = self.get_serializer_context()

      return serializer_class(*args, **kwargs)

   def get_queryset(self):
      params = self.request.query_params.dict()
      if 'user' in params and 'current' in params:
         queryset = Order.objects.filter(id_client=params['user'], id_status=1)
         if (len(queryset) == 0):
            new_order = Order(id_client=params['user'], id_status=1, sum=0)
            new_order.save()
         queryset = Order.objects.filter(id_client=params['user'], id_status=1)
      elif 'user' in params and 'old' in params:
         queryset = Order.objects.filter(id_client=params['user'], id_status__gt=1).order_by('-order_date', '-id_order')
      elif 'user' in params:
         queryset = Order.objects.filter(id_client=params['user'])
         if (len(queryset) == 0):
            new_order = Order(id_client=params['user'], id_status=1, sum=0)
            new_order.save()
         queryset = Order.objects.filter(id_client=params['user'])
      else:
         queryset = Order.objects.all()
      return queryset


class CurrOrdViewSet(viewsets.ModelViewSet):
   serializer_class = ExtOrderSerializer
   def get_queryset(self):
      params = self.request.query_params.dict()
      if('user' in params):
         queryset=Order.objects.filter(
            id_order=params['user'],
            id_status=1
         )
      else:
         queryset=Order.objects.all()
      return queryset