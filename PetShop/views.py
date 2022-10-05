from django.shortcuts import render
from django.http import HttpResponse
from datetime import date

# Create your views here.

# def hello(request):
#     return HttpResponse('Hello world!')
#
# def hello(request):
#     return render(request, 'index.html')

def hello(request):
    return render(request, 'index.html', { 'data' : {
        'current_date': date.today(),
        'list': ['python', 'django', 'html']
    }})

def GetOrders(request):
    return render(request, 'orders.html', {'data' : {
        'current_date': date.today(),
        'orders': [
            {'title': 'Товар 1', 'id': 1},
            {'title': 'Товар 2', 'id': 2},
            {'title': 'Товар 3', 'id': 3},
        ]
    }})

def GetOrder(request, id):
    return render(request, 'order.html', {'data' : {
        'current_date': date.today(),
        'id': id
    }})

def GetAnimals(request):
    return render(request, 'main.html', {'data' : {
        'current_date': date.today(),
        'animals': [
            {'title': 'Кошки', 'id': 1, 'name': 'Кошки'},
            {'title': 'Собаки', 'id': 2, 'name': 'Собаки'},
            {'title': 'Грызуны', 'id': 3, 'name': 'Грызуны'},
            {'title': 'Птицы', 'id': 4, 'name': 'Птицы'},
            {'title': 'Рептилии', 'id': 5, 'name': 'Рептилии'},
            {'title': 'Рыбы', 'id': 6, 'name': 'Рыбы'},
        ]
    }})

def GetAnimal(request, name):
    return render(request, 'animal.html', {'data' : {
        'current_date': date.today(),
        'name': name,
        'categories': [
            {'name': 'Кошки', 'categories': [
                {'title': 'Корм для котов', 'id': 1, 'name': 'Корм для котов'},
                {'title': 'Лакомства для котов', 'id': 2, 'name': 'Лакомства для котов'},
                {'title': 'Игрушки для котов', 'id': 3, 'name': 'Игрушки для котов'},
                {'title': 'Лотки и наполнители для котов', 'id': 4, 'name': 'Лотки и наполнители для котов'},
                {'title': 'Одежда и поводки для котов', 'id': 5, 'name': 'Одежда и поводки для котов'},
                {'title': 'Домики и лежанки для котов', 'id': 6, 'name': 'Домики и лежанки для котов'},
                {'title': 'Миски и кормушки для котов', 'id': 7, 'name': 'Миски и кормушки для котов'},
                {'title': 'Сумки и переноски для котов', 'id': 8, 'name': 'Сумки и переноски для котов'},
            ]},
            {'name': 'Собаки', 'categories': [
                {'title': 'Корм для собак', 'id': 1, 'name': 'Корм для собак'},
                {'title': 'Лакомства для собак', 'id': 2, 'name': 'Лакомства для собак'},
                {'title': 'Игрушки для собак', 'id': 3, 'name': 'Игрушки для собак'},
                {'title': 'Лотки и наполнители для собак', 'id': 4, 'name': 'Лотки и наполнители для собак'},
                {'title': 'Одежда и поводки для собак', 'id': 5, 'name': 'Одежда и поводки для собак'},
                {'title': 'Домики и лежанки для собак', 'id': 6, 'name': 'Домики и лежанки для собак'},
                {'title': 'Миски и кормушки для собак', 'id': 7, 'name': 'Миски и кормушки для собак'},
                {'title': 'Сумки и переноски для собак', 'id': 8, 'name': 'Сумки и переноски для собак'},
            ]},
            {'name': 'Грызуны', 'categories': [
                {'title': 'Корм для грызунов', 'id': 1, 'name': 'Корм для грызунов'},
                {'title': 'Лакомства для грызунов', 'id': 2, 'name': 'Лакомства для грызунов'},
                {'title': 'Игрушки для грызунов', 'id': 3, 'name': 'Игрушки для грызунов'},
                {'title': 'Клетки для грызунов', 'id': 4, 'name': 'Клетки для грызунов'},
                {'title': 'Наполнители для грызунов', 'id': 5, 'name': 'Наполнители для грызунов'},
                {'title': 'Домики и лежанки для грызунов', 'id': 6, 'name': 'Домики и лежанки для грызунов'},
                {'title': 'Кормушки и поилки для грызунов', 'id': 7, 'name': 'Кормушки и поилки для грызунов'},
            ]},
            {'name': 'Птицы', 'categories': [
                {'title': 'Корм для птиц', 'id': 1, 'name': 'Корм для птиц'},
                {'title': 'Лакомства для птиц', 'id': 2, 'name': 'Лакомства для птиц'},
                {'title': 'Игрушки для птиц', 'id': 3, 'name': 'Игрушки для птиц'},
                {'title': 'Клетки для птиц', 'id': 4, 'name': 'Клетки для птиц'},
                {'title': 'Наполнители для птиц', 'id': 5, 'name': 'Наполнители для птиц'},
                {'title': 'Аксессуары для птиц', 'id': 6, 'name': 'Аксессуары для птиц для птиц'},
                {'title': 'Кормушки и поилки для птиц', 'id': 7, 'name': 'Кормушки и поилки для птиц'},
            ]},
            {'name': 'Рептилии', 'categories': [
                {'title': 'Корм для рептилий', 'id': 1, 'name': 'Корм для рептилий'},
                {'title': 'Террариумы для рептилий', 'id': 2, 'name': 'Террариумы для рептилий'},
                {'title': 'Декор для рептилий', 'id': 3, 'name': 'Декор для рептилий'},
                {'title': 'Оборудование для рептилий', 'id': 4, 'name': 'Оборудование для рептилий'},
            ]},
            {'name': 'Рыбы', 'categories': [
                {'title': 'Корм для рыб', 'id': 1, 'name': 'Корм для рыб'},
                {'title': 'Аквариумы для рыб', 'id': 2, 'name': 'Аквариумы для рыб'},
                {'title': 'Декор для рыб', 'id': 3, 'name': 'Декор для рыб'},
                {'title': 'Оборудование для рыб', 'id': 4, 'name': 'Оборудование для рыб'},
            ]},
        ]
    }})

def GetCategory(request, name):
    return render(request, 'category.html', {'data' : {
        'current_date': date.today(),
        'name': name,
        'items': [
            {'category': 'Корм для котов', 'name': 'Purina One', 'price': '250 руб.', 'img': 'https://vplate.ru/images/article/thumb/715-0/2021/10/purina-one-dlya-sterilizovannyh-koshek-i-kastrirovannyh-kotov-2.jpeg'},
            {'category': 'Корм для котов', 'name': 'Grandorf', 'price': '400 руб.', 'img': 'https://kotikiporody.ru/wp-content/uploads/2019/03/Grandorf-%D0%BA%D0%BE%D1%80%D0%BC-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D1%88%D0%B5%D0%BA.jpg'},
            {'category': 'Корм для котов', 'name': 'Whiskas', 'price': '150 руб.', 'img': 'http://animalsinfo.ru/wp-content/uploads/2021/04/pitanie_domashnih_koshek.jpg'},
            {'category': 'Корм для собак', 'name': 'Grandorf', 'price': '500 руб.', 'img': 'https://vplate.ru/images/article/orig/2021/10/vse-o-kormah-dlya-sobak-srednih-porod-grandorf.jpg'},
            {'category': 'Корм для собак', 'name': 'Cesar', 'price': '100 руб.', 'img': 'https://spb.wadoo.ru/upload/iblock/fe7/fe757099c6e4ce6e9bda6e0ea5a1e926.jpg'},
            {'category': 'Корм для собак', 'name': 'Chappi', 'price': '200 руб.', 'img': 'https://eco-ferma24.ru/wp-content/uploads/2021/05/img_20210526_233948_682.jpg'},

        ]
    }})