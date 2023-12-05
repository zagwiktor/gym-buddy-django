from django.contrib import admin
from .models import (
    Exercise,
    TrainingPlan,
    ExerciseCategory,
    Raports,
)

# Register your models here.
admin.site.register(Exercise)
admin.site.register(ExerciseCategory)
admin.site.register(Raports)
admin.site.register(TrainingPlan)