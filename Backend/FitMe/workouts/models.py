from django.db import models

from .enums import WorkoutTypeOptions


class Workout(models.Model):
    client = models.ForeignKey("clients.Client", on_delete=models.CASCADE)
    time = models.DateTimeField()
    duration = models.IntegerField(
        null=True, blank=True, help_text="Workout duration in minutes."
    )
    type = models.CharField(max_length=255, choices=WorkoutTypeOptions.choices)
    description = models.CharField(max_length=512, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
