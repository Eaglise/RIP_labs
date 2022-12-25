from rest_framework import viewsets
from Pensione.serializers import *
from Pensione.models import *
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser, \
    IsManagerOrReadOnly
from rest_framework.response import Response
from django.db.models import Min, Max
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from django.conf import settings
import uuid

@permission_classes([IsManagerOrReadOnly])
@authentication_classes([JWTAuthentication])
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id_category')
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

# @permission_classes([IsAuthenticated])
@permission_classes([IsManagerOrReadOnly])
@authentication_classes([JWTAuthentication])
# @group_required('Manager')
class StatusViewSet(viewsets.ModelViewSet):
    serializer_class = StatusSerializer

    def get_queryset(self):
        params = self.request.query_params.dict()
        if 'old' in params:
            queryset = Status.objects.filter(id_status__gt=1).order_by("id_status")
        else:
            queryset = Status.objects.all().order_by("id_status")
        return queryset


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ChoiceViewSet(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


class ChoicesViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer


class ExtServiceViewSet(viewsets.ModelViewSet):
   queryset = Service.objects.all()
   serializer_class = ExtServiceSerializer


@api_view(['GET'])
def min_max_price(request):
   return Response(Service.objects.aggregate(max_price=Max('price'), min_price=Min('price')))

@permission_classes([IsManagerOrReadOnly])
@authentication_classes([JWTAuthentication])
class ServiceViewSet(viewsets.ModelViewSet):
   serializer_class = ServiceSerializer

   def get_serializer(self, *args, **kwargs):
       params = self.request.query_params.dict()
       if 'deep' in params:
           serializer_class = ExtServiceSerializer
       else:
           serializer_class = ServiceSerializer
       kwargs['context'] = self.get_serializer_context()

       return serializer_class(*args, **kwargs)

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


@authentication_classes([JWTAuthentication])
class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    def get_serializer(self, *args, **kwargs):
      params = self.request.query_params.dict()
      if 'user' in params and 'old' in params:
         serializer_class = ExtOrderSerializer
      elif 'deep' and 'old' in params:
          serializer_class = ExtOrderSerializer
      elif 'deep' in params:
          serializer_class = ExtOrderSerializer
      else:
         serializer_class = OrderSerializer
      kwargs['context'] = self.get_serializer_context()

      return serializer_class(*args, **kwargs)

    def get_queryset(self):
      params = self.request.query_params.dict()

      if 'user' in params and 'start' in params and 'end' in params and 'status' in params:
          queryset = Order.objects.filter(id_client=params['user'], status=params['status'],
                                          order_date__gte=params['start'], order_date__lte=params['end']).order_by('-order_date', 'id_order')
      elif 'user' in params and 'start' in params and 'end' in params:
          queryset = Order.objects.filter(id_client=params['user'], status__gt=1,
                                          order_date__gte=params['start'], order_date__lte=params['end']).order_by('-order_date', 'id_order')
      elif 'user' in params and 'start' in params and 'end' in params:
          queryset = Order.objects.filter(status__gt=1,order_date__gte=params['start'], order_date__lte=params['end']).order_by('-order_date', 'id_order')
      elif 'start' in params and 'end' in params and 'status' in params:
          queryset = Order.objects.filter(status=params['status'],
                                          order_date__gte=params['start'], order_date__lte=params['end']).order_by('-order_date', 'id_order')
      elif 'start' in params and 'end' in params:
          queryset = Order.objects.filter(status__gt=1,
                                          order_date__gte=params['start'], order_date__lte=params['end']
                                          ).order_by(
              '-order_date', 'id_order')

      elif 'user' in params and 'status' in params:
          queryset = Order.objects.filter(id_client=params['user'],status=params['status']).order_by('-order_date', 'id_order')

      elif 'user' in params and 'current' in params:
         queryset = Order.objects.filter(id_client=params['user'], status=1)
         if (len(queryset) == 0):
            new_order = Order(id_client=params['user'], status=1, sum=0)
            new_order.save()
         queryset = Order.objects.filter(id_client=params['user'], status=1)
      elif 'user' in params and 'old' in params:
         queryset = Order.objects.filter(id_client=params['user'], status__gt=1).order_by('-order_date', '-id_order')
      elif 'user' in params:
         queryset = Order.objects.filter(id_client_id=params['user'])
         if (len(queryset) == 0):
            new_order = Order(id_client_id=params['user'], status_id=1, sum=0)
            new_order.save()
         queryset = Order.objects.filter(id_client_id=params['user'])
      elif 'old' in params:
         queryset=Order.objects.filter(status__id_status__gt=1).order_by('-order_date', 'id_order')
      elif 'status' in params:
          queryset=Order.objects.filter(status=params['status'])
      else:
         queryset = Order.objects.all().order_by('-order_date', 'id_order')
      return queryset



class CurrOrdViewSet(viewsets.ModelViewSet):
    # permission_classes = [AllowAny]
    serializer_class = ExtOrderSerializer
    def get_queryset(self):
      params = self.request.query_params.dict()
      if('user' in params):
         queryset=Order.objects.filter(
            id_client=params['user'],
            status=1
         )
         if(len(queryset) == 0):
            new_order = Order(sum=0, id_client_id=params['user'], status_id=1, id_manager_id=1)
            new_order.save()
            queryset = Order.objects.filter(
               id_client=params['user'],
               status=1
            )
            print(queryset)
            print(new_order)
      else:
         queryset=Order.objects.all()
      return queryset


class CurrChViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = ExtChoiceSerializer
    def get_queryset(self):
      params = self.request.query_params.dict()
      if('user' in params):
         queryset=Choice.objects.filter(
            id_order__id_client=params['user'],
            id_order__status=1
         )
      else:
         queryset=Choice.objects.all()
      return queryset


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def createUser(request):
        if request.method == 'POST':
            print(request.data)
            user = User.objects.create_user(request.data['username'], request.data['email'], request.data['password'])
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.save()
            print(request.data)
            return HttpResponse("{'status': 'ok'}")
        else:
            return HttpResponse("{'status': 'error'}")


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request: Request):
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return Response({'status': 'Success'})
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    print('USERINFO')
    # print(UserSerializer(request.user))

    userInfo=dict(UserSerializer(request.user).data)
    groups=list(User.objects.get(id=userInfo['id']).groups.values_list('name',flat = True))
    print(groups)



    return Response({
        'data': UserSerializer(request.user).data,
        'groups': User.objects.get(id=userInfo['id']).groups.values_list('name',flat = True)
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_moder(request):
    user = request.user
    return Response(user.groups.filter(name='moderators').exists())