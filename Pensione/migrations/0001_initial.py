# Generated by Django 4.1.2 on 2022-10-22 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id_category', models.AutoField(db_column='ID_category', primary_key=True, serialize=False)),
                ('category_name', models.CharField(db_column='categoryName', max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id_choice', models.AutoField(db_column='ID_choice', primary_key=True, serialize=False)),
                ('reservation_date_start', models.DateTimeField(db_column='reservationDateStart', null=True)),
                ('reservation_date_end', models.DateTimeField(db_column='reservationDateEnd', null=True)),
                ('comment', models.CharField(blank=True, db_column='comment', max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id_client', models.AutoField(db_column='ID_client', primary_key=True, serialize=False)),
                ('social_card_number', models.IntegerField(db_column='socialCardNumber', unique=True)),
                ('client_address', models.CharField(db_column='clientAddress', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Personal',
            fields=[
                ('id_personal', models.AutoField(db_column='ID_personal', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='name', max_length=50)),
                ('phone', models.CharField(db_column='phone', max_length=20)),
                ('email', models.CharField(db_column='email', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id_status', models.AutoField(db_column='ID_status', primary_key=True, serialize=False)),
                ('status', models.CharField(db_column='status', max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id_user', models.AutoField(db_column='ID_user', primary_key=True, serialize=False)),
                ('login', models.CharField(db_column='login', max_length=30, unique=True)),
                ('password', models.CharField(db_column='password', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Workers',
            fields=[
                ('id_worker', models.AutoField(db_column='ID_worker', primary_key=True, serialize=False)),
                ('worker_type', models.CharField(db_column='workerType', max_length=30)),
                ('photo', models.CharField(blank=True, db_column='photo', max_length=100, null=True)),
                ('description', models.CharField(blank=True, db_column='description', max_length=200, null=True)),
                ('worker_personal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.personal')),
                ('worker_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.users')),
            ],
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id_service', models.AutoField(db_column='ID_service', primary_key=True, serialize=False)),
                ('service_name', models.CharField(db_column='serviceName', max_length=30)),
                ('price', models.IntegerField(blank=True, db_column='price', null=True)),
                ('image', models.CharField(blank=True, db_column='image', max_length=100, null=True)),
                ('description', models.CharField(blank=True, db_column='description', max_length=200, null=True)),
                ('id_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.categories')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id_order', models.AutoField(db_column='ID_order', primary_key=True, serialize=False)),
                ('order_date', models.DateTimeField(auto_now_add=True, db_column='orderDate')),
                ('id_choice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.choice')),
                ('id_client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.client')),
                ('id_manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.workers')),
                ('id_status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.status')),
            ],
        ),
        migrations.AddField(
            model_name='client',
            name='client_personal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.personal'),
        ),
        migrations.AddField(
            model_name='client',
            name='client_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.users'),
        ),
        migrations.AddField(
            model_name='choice',
            name='id_service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.services'),
        ),
        migrations.AddField(
            model_name='choice',
            name='id_worker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pensione.workers'),
        ),
    ]