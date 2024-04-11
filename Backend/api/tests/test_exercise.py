from django.test import SimpleTestCase
from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from api.views import ( exercise_list_view, 
                       exercise_delete_view, 
                       exercise_detail_view, 
                       exercise_create_view, 
                       exercise_update_view )
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from api.models import ExerciseCategory, Exercise
from api.serializers import ExerciseSerializer

class ExerciseUrlsTests(SimpleTestCase):
    def test_get_exercise_list_is_resolved(self):
        url = reverse('exercise-list')
        self.assertEqual(resolve(url).func, exercise_list_view)
    
    def test_get_exercise_detail_is_resolved(self):
        url = reverse('exercise-detail', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, exercise_detail_view)
    
    def test_post_exercise_is_resolved(self):
        url = reverse('exercise-create')
        self.assertEqual(resolve(url).func, exercise_create_view)
    
    def test_put_exercise_is_resolved(self):
        url = reverse('exercise-update', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, exercise_update_view)

    def test_delete_exercise_is_resolved(self):
        url = reverse('exercise-delete', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, exercise_delete_view)

class ExerciseViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        token = Token.objects.create(user=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {token.key}')
        self.category = ExerciseCategory.objects.create(name='test category', author=self.user)
        self.exercise = Exercise.objects.create(
            name='test exercise',
            description='test description',
            author=self.user,
            sets=7,  
            repetitions=5, 
            category=self.category
        )
        self.exercise2 = Exercise.objects.create(
            name='test exercise 2',
            description='test description',
            author=self.user,
            sets=7,  
            repetitions=5, 
            category=self.category
        )

    def test_get_exercise_detail(self):
        response = self.client.get(f'/api/exercise-detail/{self.exercise.pk}', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = ExerciseSerializer(self.exercise).data
        self.assertEqual(response.data, expected_data)

    def test_get_nonexistent_exercise_detail(self):
        response = self.client.get(f'/api/exercise-detail/999', format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_get_exercise_list(self):
        response = self.client.get('/api/exercise-list/',format='json')
        expected_data = ExerciseSerializer([self.exercise, self.exercise2], many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(expected_data, response.data)

    def test_post_exercise(self):
        data = {
            'name': 'test exercise 3',
            'description': 'test description',
            'author': f"{self.user.id}",
            'sets': '7',
            'repetitions': '5',
            'category': f'{self.category.pk}'
        }
        response = self.client.post('/api/exercise-create/',format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_exercise_invalid_data(self):
        data = {}
        response = self.client.post('/api/exercise-create/',format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_exercise(self):
        data = {
            'name': 'test exercise (edited)',
            'description': 'test description (edited)',
            'author': f"{self.user.id}",
            'sets': '7',
            'repetitions': '5',
            'category': f'{self.category.pk}'
        }
        response = self.client.put(f'/api/exercise-update/{self.exercise.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_put_exercise_invalid_data(self): 
        data = {}
        response = self.client.put(f'/api/exercise-update/{self.exercise.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_nonexistent_exercise(self):
        data = {
            'name': 'test exercise (edited)',
            'description': 'test description (edited)',
            'author': f"{self.user.id}",
            'sets': '7',
            'repetitions': '5',
            'category': f'{self.category.pk}'
        }
        response = self.client.put(f'/api/exercise-update/999', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_exercise(self):
        response = self.client.delete(f'/api/exercise-delete/{self.exercise.pk}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Exercise has been deleted")

    def test_delete_nonexistent_exercise(self):
        response = self.client.delete('/api/exercise-delete/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class ExerciseViewTestUnauthenticated(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        self.category = ExerciseCategory.objects.create(name='test category', author=self.user)
        self.exercise = Exercise.objects.create(
            name='test exercise',
            description='test description',
            author=self.user,
            sets=7,  
            repetitions=5, 
            category=self.category
        )
        self.exercise2 = Exercise.objects.create(
            name='test exercise 2',
            description='test description',
            author=self.user,
            sets=7,  
            repetitions=5, 
            category=self.category
        )

    def test_get_exercise_detail_unauthenticated(self):
        response = self.client.get(f'/api/exercise-detail/{self.exercise.pk}', format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_get_exercise_list_unauthenticated(self):
        response = self.client.get('/api/exercise-list/',format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_exercise_unauthenticated(self):
        data = {}
        response = self.client.put(f'/api/exercise-update/{self.exercise.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_exercise_unauthenticated(self):
        data = {}
        response = self.client.post('/api/exercise-create/',format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_exercise(self):
        response = self.client.delete(f'/api/exercise-delete/{self.exercise.pk}',format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)