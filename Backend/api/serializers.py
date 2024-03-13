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
    class Meta:
        model = Exercise
        fields = '__all__'

class TrainingPlanSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    exercises = ExerciseSerializer(many=True, read_only=True)
    exercises_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        write_only=True,
        queryset=Exercise.objects.all(),
        source='exercises'  
    )
    
    def save(self, **kwargs):
        instance = super(TrainingPlanSerializer, self).save(**kwargs)
        if instance.main_plan:
            TrainingPlan.objects.exclude(id=instance.id).update(main_plan=False)
        return instance
   

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['exercises'] = ExerciseSerializer(instance.exercises.all(), many=True).data
        return representation
    
    class Meta:
        model = TrainingPlan
        fields = '__all__'
    
class RaportsSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    class Meta:
        model = Raports
        fields = '__all__'

