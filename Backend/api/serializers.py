from rest_framework import serializers
from .models import (
    Exercise,
    TrainingPlan,
    ExerciseCategory,
    Raports,
)

class ExerciseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseCategory
        fields = '__all__'


class ExerciseSerializer(serializers.ModelSerializer):
    category = ExerciseCategorySerializer()
    class Meta:
        model = Exercise
        fields = '__all__'

class TrainingPlanSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    exercises = ExerciseSerializer(many=True)
    class Meta:
        model = TrainingPlan
        fields = '__all__'

class RaportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raports
        fields = '__all__'

