from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from django.db import models

from Pension.models import *


# Create your views here.

# def hello(request):
#     return HttpResponse('Hello world!')
#
# def hello(request):
#     return render(request, 'index.html')

def Main(request):
    return render(request, 'main.html', { 'data' : {
        'current_date': date.today(),
        'data': Categories.objects.all(),
    }})

def hello(request):
    return render(request, 'base.html', { 'data' : {
        'current_date': date.today(),
        #'list': ['python', 'django', 'html']
    }})

def GetCategory(request, id):
    return render(request, 'category.html', {'data': {
        'current_date': date.today(),
        'id': id,
        'category': Categories.objects.filter(id_category=id)[0],
        'data': Services.objects.filter(id_category=id),
    }})