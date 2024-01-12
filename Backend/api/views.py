from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from .models import (
    Exercise,
    TrainingPlan,
    ExerciseCategory,
    Raports,
)
from .serializers import (
    ExerciseCategorySerializer,
    RaportsSerializer,
    TrainingPlanSerializer,
    ExerciseSerializer
)
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exercise_detail_view(request, pk):
    try:
        exercise = Exercise.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Exercise with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ExerciseSerializer(exercise, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exercise_list_view(request):
    exercise = Exercise.objects.filter(author=request.user)
    if request.method == 'GET':
        serializer = ExerciseSerializer(exercise, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def exercise_create_view(request):
    if request.method == 'POST':
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['PUT'])  
@permission_classes([IsAuthenticated])
def exercise_update_view(request, pk):
    try:
        exercise = Exercise.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Exercise with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = ExerciseSerializer(instance=exercise, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def exercise_delete_view(request, pk):
    try:
        exercise = Exercise.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Exercise with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
       delete = exercise.delete()
       if delete:
           return Response({'message': "Exercise has been deleted"}, status=status.HTTP_200_OK)
       else: 
           return Response({'message': "Delete failed"}, status=status.HTTP_400_BAD_REQUEST)
       
       

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exercise_category_detail_view(request, pk):
    try:
        exercise_category = ExerciseCategory.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Category with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ExerciseCategorySerializer(exercise_category, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exercise_category_list_view(request):
    exercise_category = ExerciseCategory.objects.filter(author=request.user)
    if request.method == 'GET':
        serializer = ExerciseCategorySerializer(exercise_category, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def exercise_category_create_view(request):
    if request.method == 'POST':
        serializer = ExerciseCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def exercise_category_update_view(request, pk):
    try:
        exercise = ExerciseCategory.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Category with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = ExerciseCategorySerializer(instance=exercise, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def exercise_category_delete_view(request, pk):
    try:
        exercise_category = ExerciseCategory.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Category with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
       delete = exercise_category.delete()
       if delete:
           return Response({'message': "Category has been deleted"}, status=status.HTTP_200_OK)
       else: 
           return Response({'message': "Delete failed"}, status=status.HTTP_400_BAD_REQUEST)
       
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def training_plan_detail_view(request, pk):
    try:
        training_plan = TrainingPlan.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Training plan with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TrainingPlanSerializer(training_plan, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def main_plan_view(request):
    try:
        training_plan = TrainingPlan.objects.get(main_plan=True, author=request.user)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TrainingPlanSerializer(training_plan, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def training_plan_list_view(request):
    training_plan = TrainingPlan.objects.filter(author=request.user)
    if request.method == 'GET':
        serializer = TrainingPlanSerializer(training_plan, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['PUT'])  
@permission_classes([IsAuthenticated])
def training_plan_update_view(request, pk):
    try:
        training_plan = TrainingPlan.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Training plan with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = TrainingPlanSerializer(instance=training_plan, data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def training_plan_create_view(request):
    if request.method == 'POST':
        serializer = TrainingPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def training_plan_delete_view(request, pk):
    try:
        training_plan = TrainingPlan.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Training plan with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
       delete = training_plan.delete()
       if delete:
           return Response({'message': "Training plan has been deleted"}, status=status.HTTP_200_OK)
       else: 
           return Response({'message': "Delete failed"}, status=status.HTTP_400_BAD_REQUEST)
       

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def raports_detail_view(request, pk):
    try:
        raport = Raports.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Raport with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = RaportsSerializer(raport, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def raports_list_view(request):
    raports = Raports.objects.filter(author=request.user)
    if request.method == 'GET':
        serializer = RaportsSerializer(raports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def raports_create_view(request):
    if request.method == 'POST':
        serializer = RaportsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def raports_update_view(request, pk):
    try:
        raport = Raports.objects.get(pk=pk)
        date = raport.date
    except ObjectDoesNotExist:
        return Response({'message': "Raport with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = RaportsSerializer(instance=raport, data=request.data) 
        if serializer.is_valid():
            serializer.validated_data['date'] = date 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def raports_delete_view(request, pk):
    try:
        raport = Raports.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return Response({'message': "Raport with that id doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "DELETE":
        delete = raport.delete()
        if delete:
           return Response({'message': "Raport has been deleted"}, status=status.HTTP_200_OK)
        else: 
           return Response({'message': "Delete failed"}, status=status.HTTP_400_BAD_REQUEST)
       