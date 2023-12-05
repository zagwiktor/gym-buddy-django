from rest_framework import serializers
from .models import (
    Exercise,
    TrainingPlan,
    ExerciseCategory,
    Raports,
)

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class TrainingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlan
        fields = '__all__'

class ExerciseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseCategory
        fields = '__all__'

class RaportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raports
        fields = '__all__'

