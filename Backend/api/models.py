from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ExerciseCategory(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Exercise(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=300, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(ExerciseCategory, on_delete=models.CASCADE)
    sets = models.PositiveIntegerField(blank=False, null=False, default=5)
    repetitions = models.PositiveIntegerField(blank=False, null=False, default=5)

    def __str__(self):
        return self.name

class TrainingPlan(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=False, null=False)
    informations = models.TextField(max_length=300, blank=True, null=True)
    start_date = models.DateTimeField(auto_now_add=True)
    exercises = models.ManyToManyField(Exercise)
    main_plan = models.BooleanField(default=False, blank=False, null=False, unique=True)

    def __str__(self):
        return self.name

class Raports(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    weight = models.FloatField(blank=False, null=False)
    calories = models.PositiveIntegerField(blank=True, null=True)
    chest_circuit = models.FloatField(blank=True, null=True)
    biceps_circuit = models.FloatField(blank=True, null=True)
    thigh_circuit = models.FloatField(blank=True, null=True)
    waist_circuit = models.FloatField(blank=True, null=True)
    calf_circuit = models.FloatField(blank=True, null=True)