from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    id_category = models.AutoField(db_column='ID_category', primary_key=True)
    category_name = models.CharField(db_column='categoryName', unique=True, max_length=50)

    def __str__(self):
        return self.category_name


class Service(models.Model):
    id_service = models.AutoField(db_column='ID_service', primary_key=True)
    id_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    service_name = models.CharField(db_column='serviceName', max_length=30)
    price = models.IntegerField(db_column='price', blank=True, null=True)
    image = models.CharField(db_column='image', max_length=100, null=True, blank=True)
    description = models.CharField(db_column='description', max_length=200, null=True, blank=True)

    def __str__(self):
        return self.service_name


class Worker(models.Model):
    id_worker = models.AutoField(db_column='ID_worker', primary_key=True)
    worker_user = models.ForeignKey(User, on_delete=models.CASCADE)
    worker_type = models.CharField(db_column='workerType', max_length=30)
    photo = models.CharField(db_column='photo', max_length=100, null=True, blank=True)
    description = models.CharField(db_column='description', max_length=200, null=True, blank=True)


class Choice(models.Model):
    id_choice = models.AutoField(db_column='ID_choice', primary_key=True)
    id_service = models.ForeignKey(Service, on_delete=models.CASCADE)
    id_worker = models.ForeignKey(Worker, on_delete=models.CASCADE, null=True)
    reservation_date_start = models.DateTimeField(db_column='reservationDateStart', null=True)
    reservation_date_end = models.DateTimeField(db_column='reservationDateEnd', null=True)
    comment = models.CharField(db_column='comment', max_length=250, null=True, blank=True)


class Client(models.Model):
    id_client = models.AutoField(db_column='ID_client', primary_key=True)
    client_user = models.ForeignKey(User, on_delete=models.CASCADE)
    social_card_number = models.IntegerField(db_column='socialCardNumber', unique=True)
    client_address = models.CharField(db_column='clientAddress', max_length=100)

    def __str__(self):
        return self.social_card_number


class Status(models.Model):
    id_status = models.AutoField(db_column='ID_status', primary_key=True)
    status = models.CharField(db_column="status", max_length=10)

    def __str__(self):
        return self.status


class Order(models.Model):
    id_order = models.AutoField(db_column='ID_order', primary_key=True)
    id_client = models.ForeignKey(Client, on_delete=models.CASCADE)
    id_choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    id_manager = models.ForeignKey(Worker, on_delete=models.CASCADE, null=True)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    order_date = models.DateTimeField(db_column='orderDate', auto_now_add=True)
    sum = models.BigIntegerField(default=0)

