from django.db import models


class WorkoutTypeOptions(models.TextChoices):
    STRENGTH_TRAINING = "Strength training"
    HIIT = "High-intensity interval training"
    HICT = "High-intensity circuit training"
    HIST = "High-intensity strength training"
    POWERBUILDING = "Powerbuilding"
    LIC = "Low-intensity cardio"
    AEROBIC = "Aerobic"
