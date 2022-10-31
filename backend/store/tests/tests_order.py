
from urllib import response
from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Order, OrderItem, Product
from django.contrib.auth.models import User


class OrderTests(APITestCase):
    def setUp(self):

        # self.authenticate()
        self.product = Product.objects.create(name="Test", price=10)
        self.order = Order.objects.create(totalPrice=10)
        self.orderItem = OrderItem.objects.create(
            order=self.order, product=self.product, qty=1, image=self.product.image)

    def authenticate(self, AdminStatus):
        response = self.client.post(reverse("register"), {
            'name': 'name',
            'email': 'email@gmail.com',
            'username': 'email@gmail.com',
            'password': 'password'})
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")

        response = self.client.put(reverse('user-update', kwargs={'pk': User.objects.last().id}), {
            'name': 'name', 'email': 'email@email.com', 'isAdmin': AdminStatus
        })

        response = self.client.post(
            reverse('token_obtain_pair'), {'username': 'email@email.com', 'password': 'password'})

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")

    def test_api_create_order_staff(self):
        self.authenticate(True)
        data = {
            "totalPrice": 5,
        }
        response = self.client.post(reverse('orders-add'), data)
        self.assertEqual(response.status_code,
                         status.HTTP_403_FORBIDDEN)

    def test_api_create_Customer(self):
        self.authenticate(False)

        data = {
            "orderItems": [
                {
                    "product": Product.objects.last()._id,
                    "name": "X",
                    "image": "http://127.0.0.1:8000/images/Tokyo_Night.png",
                    "price": "12",
                    "qty": "1"
                }
            ],

            "totalPrice": "12.00"
        }

        response = self.client.post(reverse('orders-add'), data, format="json")
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(Order.objects.count(), 2)

    def test_api_list_my_orders(self):
        self.authenticate(False)
        response = self.client.get(reverse('myorders'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_get_all_orders(self):

        self.authenticate(True)
        response = self.client.get(reverse('orders'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_get_order_by_id(self):
        self.authenticate(True)
        order = Order.objects.last()
        response = self.client.get(
            reverse('user-order', kwargs={'pk': order._id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
