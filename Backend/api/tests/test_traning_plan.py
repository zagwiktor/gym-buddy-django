from django.test import SimpleTestCase
from rest_framework.test import APITestCase
from django.urls import reverse, resolve
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from api.models import TrainingPlan, Exercise, ExerciseCategory
from api.serializers import TrainingPlanSerializer
from api.views import ( training_plan_create_view, 
                       training_plan_delete_view, 
                       training_plan_detail_view, 
                       training_plan_list_view, 
                       training_plan_update_view, 
                       main_plan_view )

class TraningPlanUrlsTests(SimpleTestCase):
    def test_get_traning_plan_list_is_resolved(self):
        url = reverse('training-plan-list')
        self.assertEqual(resolve(url).func, training_plan_list_view)

    def test_get_traning_plan_detail_is_resolved(self):
        url = reverse('training-plan-detail', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, training_plan_detail_view)

    def test_put_traning_plan_update_is_resolved(self):
        url = reverse('training-plan-update', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, training_plan_update_view)
    
    def test_post_traning_plan_create_is_resolved(self):
        url = reverse('training-plan-create')
        self.assertEqual(resolve(url).func, training_plan_create_view)

    def test_delete_traning_plan_is_resolved(self):
        url = reverse('training-plan-delete', kwargs={'pk': 1})
        self.assertEqual(resolve(url).func, training_plan_delete_view)

    def test_get_main_plan_is_resolved(self):
        url = reverse('main-plan')
        self.assertEqual(resolve(url).func, main_plan_view)

class TraningPlanViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        token = Token.objects.create(user=self.user)
        self.category = ExerciseCategory.objects.create(name='test category', author=self.user)
        self.client = self.client_class(HTTP_AUTHORIZATION=f'Token {token.key}')
        self.exercise1 = Exercise.objects.create(
            name='test exercise',
            description='test description',
            author=self.user,
            sets=7,  
            repetitions=5, 
            category=self.category
        )
        self.training_plan_main = TrainingPlan.objects.create(
            author=self.user,
            name="test main plan",
            informations="test plan",
            main_plan=True
        )
        self.training_plan_main.exercises.set([self.exercise1])
        self.training_plan = TrainingPlan.objects.create(
            author=self.user,
            name= "test plan",
            informations= "test plan",
            main_plan = False
        )
        self.training_plan.exercises.set([self.exercise1])

    def test_get_traning_plan_list(self):
        response = self.client.get('/api/training-plan-list/', format='json')  
        expected_data = TrainingPlanSerializer([self.training_plan_main, self.training_plan], many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(expected_data, response.data)

    def test_get_traning_plan_detail(self):
        response = self.client.get(f'/api/training-plan-detail/{self.training_plan.pk}', format='json')  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_get_nonexistent_traning_plan_detail(self):
        response = self.client.get('/api/training-plan-detail/999', format='json')  
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_traning_plan(self):
        data = {
            'name': 'test plan post',
            'informations': 'test description',
            'author': f"{self.user.id}",
            'exercises_ids': [self.exercise1.pk],
            'main_plan': False
        }
        response = self.client.post('/api/training-plan-create/', format='json', data=data)  
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_traning_plan_invalid_data(self):
        data = {}
        response = self.client.post('/api/training-plan-create/', format='json', data=data)  
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_traning_plan(self):
        data = {
            'name': 'test plan (edited, now main)',
            'informations': 'test description',
            'author': f"{self.user.id}",
            'exercises_ids': [self.exercise1.pk],
            'main_plan': True
        }
        response = self.client.put(f'/api/training-plan-update/{self.training_plan.pk}', format='json', data=data)  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        count_of_main_plans = TrainingPlan.objects.filter(main_plan=True).count()
        self.assertEqual(count_of_main_plans, 1)

    def test_put_traning_plan_invalid_data(self):
        data = {
            "author": "",
            "name": "",
            "informations": "",
            "exercises_ids": "",
            "main_plan": ""
        }
        response = self.client.put(f'/api/training-plan-update/{self.training_plan.pk}', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_nonexistent_traning_plan_invalid_data(self):
        data = {}
        response = self.client.put('/api/training-plan-update/999', format='json', data=data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_training_plan(self):
        response = self.client.delete(f'/api/training-plan-delete/{self.training_plan.pk}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Training plan has been deleted")
        self.assertFalse(TrainingPlan.objects.filter(pk=self.training_plan.pk).exists())

    def test_delete_nonexistent_training_plan(self):
        response = self.client.delete('/api/training-plan-delete/999')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['message'], "Training plan with that id doesn't exist")

    def test_get_main_training_plan(self):
        response = self.client.get('/api/main-plan/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.training_plan_main.name)
        

    def test_get_nonexistent_main_training_plan(self):
        self.training_plan_main.delete()
        response = self.client.get('/api/main-plan/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class TraningPlanViewTestUnauthenticated(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', password='test_haslo123', email='test_user123@gmail.com')
        self.category = ExerciseCategory.objects.create(name='test category', author=self.user)
        self.exercise1 = Exercise.objects.create(
            name='test exercise',
            description='test description',
            author=self.user,
            sets=7,  
            repetitions=5, 
            category=self.category
        )
        self.training_plan_main = TrainingPlan.objects.create(
            author=self.user,
            name="test main plan",
            informations="test plan",
            main_plan=True
        )

    def test_get_traning_plan_list_unauthenticated(self):
        response = self.client.get('/api/training-plan-list/', format='json')  
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_traning_plan_detail_unauthenticated(self):
        response = self.client.get(f'/api/training-plan-detail/{self.training_plan_main.pk}', format='json')  
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_traning_plan_unauthenticated(self):
        data = {}
        response = self.client.post('/api/training-plan-create/', format='json', data=data)  
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_traning_plan_unauthenticated(self):
        data = {}
        response = self.client.put(f'/api/training-plan-update/{self.training_plan_main.pk}', format='json', data=data)  
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_training_plan_unauthenticated(self):
        response = self.client.delete(f'/api/training-plan-delete/{self.training_plan_main.pk}')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_main_training_plan_unauthenticated(self):
        response = self.client.get('/api/main-plan/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)