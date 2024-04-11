from django.test import SimpleTestCase
from django.urls import reverse, resolve
from authentication.views import LoginUser, LogoutUser, RegisterUser
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class AuthenticationUrlsTest(SimpleTestCase):
    def test_login_url_resolves(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func.view_class, LoginUser)

    def test_logout_url_resolves(self):
        url = reverse('logout')
        self.assertEqual(resolve(url).func.view_class, LogoutUser)

    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func.view_class, RegisterUser)

class RegisterViewTest(APITestCase):
    def test_register(self):
        data = {"username" : "testuser12345","email" : 'test@gmail.com',"password": "test12345",'first_name' : 'test','last_name' : 'test'}
        response = self.client.post('/authentication/register/',data = data,format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_invalid_username(self):
        data = {"username" : "123","email" : 'test@gmail.com',"password": "test12345",'first_name' : 'test','last_name' : 'test'}
        response = self.client.post('/authentication/register/',data,format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        
    def test_register_invalid_password(self):
        data = {"username" : "test123","email" : 'test@gmail.com',"password": "123",'first_name' : 'test','last_name' : 'test'}
        response = self.client.post('/authentication/register/',data,format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class LoginTestView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser12345',password='test12345',email='test@gmail.com',first_name='test',last_name='test')
        
    def test_login_username(self):
        data = {'username' : 'testuser12345','password':'test12345'}
        response = self.client.post('/authentication/login/',data,format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    
    def test_login_invalid_credentials_username(self):
        data = {'username' : 'test','password':'test12345'}
        response = self.client.post('/authentication/login/',data,format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        
    def test_login_invalid_credentials_password(self):
        data = {'username' : 'testuser12345','password':'12345'}
        response = self.client.post('/authentication/login/',data,format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class LogoutTestView(APITestCase):
    def setUp(self):
        user = User.objects.create_user(username='test',password='123',email='test@gmail.com')
        token = Token.objects.create(user=user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {token.key}') 
        
    def test_logout(self):
        response = self.client.post('/authentication/logout/')
        self.assertEqual(response.status_code,status.HTTP_200_OK)