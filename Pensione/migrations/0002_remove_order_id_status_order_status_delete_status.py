# Generated by Django 4.1.2 on 2022-10-31 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pensione', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='id_status',
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(db_column='status', default='Введен', max_length=20),
        ),
        migrations.DeleteModel(
            name='Status',
        ),
    ]