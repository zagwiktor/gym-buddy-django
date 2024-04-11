from django.test import SimpleTestCase
from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from api.models import ExerciseCategory
from api.serializers import ExerciseCategorySerializer
from api.views import ( exercise_category_detail_view,
                        exercise_category_list_view,
                        exercise_category_create_view,
                        exercise_category_update_view,
                        exercise_category_delete_view )

class ExerciseCategoryUrlsTests(SimpleTestCase):
    def test_get_exercise_category_detail_is_resolved(self):
        url = reverse('exercise-category-detail', kwargs={'pk': 1})
        self.assertEqual(exercise_category_detail_view, resolve(url).func)

    def test_get_exercise_category_list_is_resolved(self):
        url = reverse('exercise-category-list')
        self.assertEqual(exercise_category_list_view, resolve(url).func)

    def test_post_exercise_category_is_resolved(self):
        url = reverse('exercise-category-create')
        self.assertEqual(exercise_category_create_view, resolve(url).func)

    def test_put_exercise_category_is_resolved(self):
        url = reverse('exercise-category-update', kwargs={'pk': 1})
        self.assertEqual(exercise_category_update_view, resolve(url).func)

    def test_delete_exercise_category_is_resolved(self):
        url = reverse('exercise-category-delete', kwargs={'pk': 1})
        self.assertEqual(exercise_category_delete_view, resolve(url).func)

class ExerciseCategoryViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        token = Token.objects.create(user=self.user)
        self.category = ExerciseCategory.objects.create(name='test category', author=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {token.key}')

    def test_get_exercise_category_detail(self):
        response = self.client.get(f'/api/exercise-category-detail/{self.category.pk}', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = ExerciseCategorySerializer(self.category).data
        self.assertEqual(response.data, expected_data)

    def test_get_nonexistent_exercise_category_detail(self):
        response = self.client.get(f'/api/exercise-category-detail/999', format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_exercise_category_list(self):
        response = self.client.get('/api/exercise-category-list/',format='json')
        expected_data = ExerciseCategorySerializer([self.category], many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(expected_data, response.data)

    def test_post_exercise_category(self):
        data = {
            'name': 'test category 1',
            'author': f"{self.user.id}",
        }
        response = self.client.post('/api/exercise-category-create/', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_exercise_category_invalid_data(self):
        data = {}
        response = self.client.post('/api/exercise-category-create/',format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_exercise_category(self):
        data = {
            'name': 'test category (edited)',
            'author': f"{self.user.id}",
        }
        response = self.client.put(f'/api/exercise-category-update/{self.category.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_put_exercise_category(self):
        data = {}
        response = self.client.put(f'/api/exercise-category-update/{self.category.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_nonexistent_exercise_category(self):
        data = {}
        response = self.client.put('/api/exercise-category-update/999', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_exercise_category(self):
        response = self.client.delete(f'/api/exercise-category-delete/{self.category.pk}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Category has been deleted")

    def test_delete_nonexistent_exercise_category(self):
        response = self.client.delete('/api/exercise-category-delete/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class ExerciseCategoryViewTestUnauthenticated(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        self.category = ExerciseCategory.objects.create(name='test category', author=self.user)
    
    def test_get_exercise_category_detail_unauthenticated(self):
        response = self.client.get(f'/api/exercise-category-detail/{self.category.pk}', format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_get_exercise_categorylist_unauthenticated(self):
        response = self.client.get('/api/exercise-category-list/',format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_exercise_categoryunauthenticated(self):
        data = {}
        response = self.client.put(f'/api/exercise-category-update/{self.category.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_exercise_categoryunauthenticated(self):
        data = {}
        response = self.client.post('/api/exercise-category-create/',format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_exercise_category(self):
        response = self.client.delete(f'/api/exercise-category-delete/{self.category.pk}',format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)