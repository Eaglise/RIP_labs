from django.contrib import admin
from .models import *

admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Choice)
admin.site.register(Worker)
admin.site.register(Order)
admin.site.register(Client)
admin.site.register(Status)


