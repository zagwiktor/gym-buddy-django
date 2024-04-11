from django.test import SimpleTestCase
from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from api.views import ( raports_detail_view,
                        raports_list_view,
                        raports_create_view,
                        raports_update_view,
                        raports_delete_view )
from rest_framework import status
from api.models import Raports
from api.serializers import RaportsSerializer


class RaportsUrlsTests(SimpleTestCase):
    def test_get_raports_detail_is_resolved(self):
        url = reverse('raports-detail', kwargs={'pk': 1})
        self.assertEqual(raports_detail_view, resolve(url).func)

    def test_get_raports_list_is_resolved(self):
        url = reverse('raports-list')
        self.assertEqual(raports_list_view, resolve(url).func)

    def test_post_raports_is_resolved(self):
        url = reverse('raports-create')
        self.assertEqual(raports_create_view, resolve(url).func)

    def test_put_raports_is_resolved(self):
        url = reverse('raports-update', kwargs={'pk': 1})
        self.assertEqual(raports_update_view, resolve(url).func)

    def test_delete_raports_is_resolved(self):
        url = reverse('raports-delete', kwargs={'pk': 1})
        self.assertEqual(raports_delete_view, resolve(url).func)

class RaportsTestView(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {token.key}')
        self.raport = Raports.objects.create(author=self.user, 
                                             weight= 80,
                                             calories=2700, 
                                             chest_circuit=110, 
                                             biceps_circuit=42, 
                                             thigh_circuit=62, 
                                             waist_circuit=81, 
                                             calf_circuit=50)
        
    def test_get_raport_detail(self):
        response = self.client.get(f'/api/raports-detail/{self.raport.pk}', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = RaportsSerializer(self.raport).data
        self.assertEqual(response.data, expected_data)

    def test_get_nonexistent_raport_detail(self):
        response = self.client.get(f'/api/raports-detail/999', format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_get_raport_list(self):
        response = self.client.get('/api/raports-list/', format='json')
        expected_data = RaportsSerializer([self.raport], many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(expected_data, response.data)

    def test_post_raport(self):
        data = {'author': f'{self.user.pk}', 
                'weight':'80',
                'calories':'2700', 
                'chest_circuit':'110', 
                'biceps_circuit':'42', 
                'thigh_circuit':'62', 
                'waist_circuit':'81', 
                'calf_circuit':'50'}

        response = self.client.post('/api/raports-create/', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_raport_invalid_data(self):
        data = {}
        response = self.client.post('/api/raports-create/',format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_raport(self):
        data = {'author': f'{self.user.pk}', 
                'weight':'85',
                'calories':'2705', 
                'chest_circuit':'115', 
                'biceps_circuit':'45', 
                'thigh_circuit':'65', 
                'waist_circuit':'85', 
                'calf_circuit':'55' }
        response = self.client.put(f'/api/raports-update/{self.raport.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_put_raport_invalid_data(self): 
        data = {}
        response = self.client.put(f'/api/raports-update/{self.raport.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_nonexistent_raport(self):
        data = {}
        response = self.client.put(f'/api/raports-update/999', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    
    def test_delete_raport(self):
        response = self.client.delete(f'/api/raports-delete/{self.raport.pk}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Raport has been deleted")

    def test_delete_nonexistent_raport(self):
        response = self.client.delete('/api/raports-delete/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class RaportsViewTestUnauthenticated(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        self.raport = Raports.objects.create(author=self.user, 
                                             weight= 80,
                                             calories=2700, 
                                             chest_circuit=110, 
                                             biceps_circuit=42, 
                                             thigh_circuit=62, 
                                             waist_circuit=81, 
                                             calf_circuit=50)

    def test_get_raport_detail_unauthenticated(self):
        response = self.client.get(f'/api/raports-detail/{self.raport.pk}', format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_get_raport_list_unauthenticated(self):
        response = self.client.get('/api/raports-list/',format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_raport_unauthenticated(self):
        data = {}
        response = self.client.put(f'/api/raports-update/{self.raport.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_raport_unauthenticated(self):
        data = {}
        response = self.client.post('/api/raports-create/',format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_raport(self):
        response = self.client.delete(f'/api/raports-delete/{self.raport.pk}',format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    