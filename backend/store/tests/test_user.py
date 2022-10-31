
from urllib import response
from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Order, OrderItem, Product
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class UserTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='user@test.com', password=make_password('password'), is_active=True)

    def authenticate(self):
        response = self.client.post(reverse("register"), {
            'name': 'name',
            'email': 'email@gmail.com',
            'username': 'email@gmail.com',
            'password': 'password'})
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")
        response = self.client.put(reverse('user-update', kwargs={'pk': User.objects.last().id}), {
            'name': 'name', 'email': 'email@email.com', 'isAdmin': True
        })
        response = self.client.post(
            reverse('token_obtain_pair'), {'username': 'email@email.com', 'password': 'password'})
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")

    def test_api_login(self):

        response = self.client.post(
            reverse('token_obtain_pair'), {'username': 'user@test.com', 'password': 'password'})
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)

    def test_api_register(self):
        response = self.client.post(reverse("register"), {
            'name': 'name',
            'email': 'newemail@gmail.com',
            'username': 'newemail@gmail.com',
            'password': 'password'})

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)

    def test_api_get_user_profile(self):
        self.authenticate()
        response = self.client.get(reverse("users-profile"))
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)

    def test_api_user_profile_update(self):
        self.authenticate()
        response = self.client.put(reverse("user-profile-update"), data={
                                   "name": "New Name", "email": "email1@email.com", "password": "AAaa12345"})

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(response.data['name'],
                         "New Name")

    def test_api_get_user_by_id(self):
        self.authenticate()
        user = User.objects.last()
        response = self.client.get(reverse("user", kwargs={'pk': user.id}))
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)

    # Status

    def test_api_user_update(self):
        self.authenticate()
        response = self.client.put(reverse('user-update', kwargs={'pk': User.objects.last().id}), {
            'name': 'name', 'email': 'email@email.com', 'isAdmin': False
        })

        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(response.data['isAdmin'],
                         'False')

    def test_api_get_user_deletion(self):
        self.authenticate()
        user = User.objects.last()
        response = self.client.delete(
            reverse("user-delete", kwargs={'pk': user.id}))
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
