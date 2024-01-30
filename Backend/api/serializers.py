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

    def save(self, **kwargs):
        instance = super(TrainingPlanSerializer, self).save(**kwargs)
        if instance.main_plan:
            TrainingPlan.objects.exclude(id=instance.id).update(main_plan=False)
        return instance
    
class RaportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raports
        fields = '__all__'

