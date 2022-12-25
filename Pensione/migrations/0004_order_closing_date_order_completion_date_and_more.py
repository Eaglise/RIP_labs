# Generated by Django 4.1.2 on 2022-12-25 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pensione', '0003_alter_order_id_client'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='closing_date',
            field=models.DateTimeField(db_column='closingDate', null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='completion_date',
            field=models.DateTimeField(db_column='completionDate', null=True),
        ),
        migrations.AlterField(
            model_name='status',
            name='status',
            field=models.CharField(db_column='status', max_length=16),
        ),
    ]