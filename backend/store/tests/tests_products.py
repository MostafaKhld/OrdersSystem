
from urllib import response
from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Product
from django.contrib.auth.models import User

from django.core.files.uploadedfile import SimpleUploadedFile
import tempfile

image = tempfile.NamedTemporaryFile(suffix=".jpg").name


class ProductTests(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(name="Test", price=10)
    #     self.response = self.client.post(
    #         reverse('product-create'),
    #         self.data,
    #         format="json")

    def authenticate(self):
        response = self.client.post(reverse("register"), {
            'name': 'name',
            'email': 'email@gmail.com',
            'username': 'email@gmail.com',
            'password': 'password'})
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")

        response = self.client.put(reverse('user-update', kwargs={'pk': User.objects.last().id}), {
            'name': 'name', 'email': 'email@email.com', 'isAdmin': 'True'
        })

        response = self.client.post(
            reverse('token_obtain_pair'), {'username': 'email@email.com', 'password': 'password'})

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {response.data['access']}")

    # No Token

    def test_api_create_Product_no_token(self):
        data = {
            "name": "Product",
            "price": 5,
            "_id": 1
        }
        response = self.client.post(reverse('product-create'), data)
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Product.objects.count(), 1)

    # AUTHORIZED User Staff
    def test_api_create_Product(self):
        self.authenticate()
        data = {
            "name": "Sample Name",
            "price": 0,

        }
        response = self.client.post(reverse('product-create'), data)
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)
        self.assertEqual(Product.objects.last().name, 'Sample Name')

    def test_api_list_Products(self):
        url = reverse('products')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_can_get_a_Product(self):

        response = self.client.get(
            reverse('product',
                    kwargs={'pk': self.product._id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_can_upload_image(self):
        self.authenticate()
        product = Product.objects.last()
        new_data = {
            'image': image,
            'product_id': product._id
        }
        response = self.client.post(
            reverse('image-upload',
                    ), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_can_update_a_Product(self):
        self.authenticate()
        product = Product.objects.last()
        new_data = {
            "name": "Product ++",
            "price": 10,
        }
        response = self.client.put(
            reverse('product-update',
                    kwargs={'pk': product._id}), data=new_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.get().name, 'Product ++')

    def test_api_can_delete_a_Product(self):
        self.authenticate()
        product = Product.objects.last()
        response = self.client.delete(
            reverse('product-delete',
                    kwargs={'pk': product._id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.count(), 0)

    def test_api_can_search_a_Product_by_name(self):
        self.authenticate()
        product = Product.objects.last()
        response = self.client.get(
            reverse('products',
                    ), QUERY_STRING=product.name, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
