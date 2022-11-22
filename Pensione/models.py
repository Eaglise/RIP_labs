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


class Users(models.Model):
    id_user = models.AutoField(db_column='ID_user', primary_key=True)
    login = models.CharField(db_column='login', unique=True, max_length=30)
    password = models.CharField(db_column='password', max_length=30)


class Personal(models.Model):
    id_personal = models.AutoField(db_column='ID_personal', primary_key=True)
    name = models.CharField(db_column='name', max_length=50)
    phone = models.CharField(db_column='phone', max_length=20)
    email = models.CharField(db_column='email', max_length=30)


class Workers (models.Model):
    id_worker = models.AutoField(db_column='ID_worker', primary_key=True)
    worker_user = models.ForeignKey(Users, on_delete=models.CASCADE)
    worker_personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    worker_type = models.CharField(db_column='workerType', max_length=30)
    photo = models.CharField(db_column='photo', max_length=100, null=True, blank=True)
    description = models.CharField(db_column='description', max_length=200, null=True, blank=True)


class Choice(models.Model):
    id_choice = models.AutoField(db_column='ID_choice', primary_key=True)
    id_service = models.ForeignKey(Services, on_delete=models.CASCADE)
    id_worker = models.ForeignKey(Workers, on_delete=models.CASCADE)
    reservation_date_start = models.DateTimeField(db_column='reservationDateStart', null=True)
    reservation_date_end = models.DateTimeField(db_column='reservationDateEnd', null=True)
    comment = models.CharField(db_column='comment', max_length=250, null=True, blank=True)


class Client (models.Model):
    id_client = models.AutoField(db_column='ID_client', primary_key=True)
    client_user = models.ForeignKey(Users, on_delete=models.CASCADE)
    client_personal = models.ForeignKey(Personal, on_delete=models.CASCADE)
    social_card_number = models.IntegerField(db_column='socialCardNumber', unique=True)
    client_address = models.CharField(db_column='clientAddress', max_length=100)


class Order(models.Model):
    id_order = models.AutoField(db_column='ID_order', primary_key=True)
    id_choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    id_client = models.ForeignKey(Client, on_delete=models.CASCADE)
    id_manager = models.ForeignKey(Workers, on_delete=models.CASCADE)
    status = models.CharField(db_column='status', max_length=20, default='Введен')
    order_date = models.DateTimeField(db_column='orderDate', auto_now_add=True)
