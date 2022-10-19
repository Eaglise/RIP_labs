from django.db import models

# Create your models here


class Categories(models.Model):
    id_category = models.AutoField(db_column='ID_category', primary_key=True)
    category_name = models.CharField(db_column='categoryName', unique=True, max_length=50)


class Services (models.Model):
    id_service = models.AutoField(db_column='ID_service', primary_key=True)
    id_category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    service_name = models.CharField(db_column='serviceName', max_length=30)
    price = models.IntegerField(db_column='price', blank=True, null=True)
    image = models.CharField(db_column='image', max_length=100, null=True, blank=True)
    description = models.CharField(db_column='description', max_length=200, null=True, blank=True)


class Date (models.Model):
    id_date = models.AutoField(db_column='ID_date', primary_key=True)
    time = models.TimeField(auto_now=False, auto_now_add=True)
    date = models.DateField(auto_now=False, auto_now_add=True)


class Workers (models.Model):
    id_worker = models.AutoField(db_column='ID_worker', primary_key=True)
    worker_name = models.CharField(db_column='workerName', max_length=30)
    worker_phone = models.CharField(db_column='workerPhone', max_length=20)
    worker_type = models.CharField(db_column='workerType', max_length=30)
    photo = models.CharField(db_column='photo', max_length=100, null=True, blank=True)
    description = models.CharField(db_column='description', max_length=200, null=True, blank=True)


class Choice(models.Model):
    id_choice = models.AutoField(db_column='ID_choice', primary_key=True)
    id_service = models.ForeignKey(Services, on_delete=models.CASCADE)
    id_worker = models.ForeignKey(Workers, on_delete=models.CASCADE)
    id_serviceDate = models.ForeignKey(Date, on_delete=models.CASCADE)
    comment = models.CharField(db_column='comment', max_length=200, null=True, blank=True)


class Status(models.Model):
    id_status = models.AutoField(db_column='ID_status', primary_key=True)
    status = models.CharField(db_column='status', unique=True, max_length=20)


class Manager(models.Model):
    id_manager = models.AutoField(db_column='ID_manager', primary_key=True)
    manager_name = models.CharField(db_column='managerName', unique=True, max_length=20)
    manager_phone = models.CharField(db_column='managerPhone', max_length=20)


class Client (models.Model):
    id_client = models.AutoField(db_column='ID_client', primary_key=True)
    client_name = models.CharField(db_column='clientName', max_length=30)
    client_phone = models.CharField(db_column='clientPhone', max_length=20)
    client_login = models.CharField(db_column='clientLogin', unique=True, max_length=30)
    client_password = models.CharField(db_column='clientPassword', max_length=30)
    social_card_number = models.IntegerField(db_column='socialCardNumber', unique=True)
    client_address = models.CharField(db_column='clientAddress', max_length=100)


class Order(models.Model):
    id_order = models.AutoField(db_column='ID_order', primary_key=True)
    id_choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    id_client = models.ForeignKey(Client, on_delete=models.CASCADE)
    id_orderDate = models.ForeignKey(Date, on_delete=models.CASCADE)
    id_status = models.ForeignKey(Status, on_delete=models.CASCADE)
    id_manager = models.ForeignKey(Manager, on_delete=models.CASCADE)
