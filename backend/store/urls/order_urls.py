from django.urls import path
from store.views import order_views as views


urlpatterns = [

    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),


    path('<str:pk>/', views.getOrderById, name='user-order'),

]
