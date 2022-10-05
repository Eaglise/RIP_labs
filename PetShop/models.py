from django.db import models

# Create your models here

class Animals (models.Model):
    id_animal = models.AutoField(db_column='ID_animal', primary_key=True)
    animal_name = models.CharField(db_column='animalName', unique=True, max_length=30)

    class Meta:
        managed = False
        db_table = 'Animals'

class Categories(models.Model):
    id_category = models.AutoField(db_column='ID_category', primary_key=True)
    id_animal = models.ForeignKey(Animals, on_delete=models.CASCADE)
    category_name = models.CharField(db_column='categoryName', unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'Categories'

class Items(models.Model):
    id_item = models.AutoField(db_column='ID_item', primary_key=True)
    id_category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    item_name = models.CharField(db_column='itemName', max_length=30)
    price = models.IntegerField(db_column='price')
    image = models.CharField(db_column='image', max_length=100, null=True, blank=True)
    description = models.CharField(db_column='description', max_length=200, null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'Items'

class Stock(models.Model):
    id_stock = models.AutoField(db_column='ID_stock', primary_key=True)
    id_item = models.ForeignKey(Items, on_delete=models.CASCADE)
    amount_in_stock = models.IntegerField(db_column='amountInStock')

    class Meta:
        managed = False
        db_table = 'Stock'