from django.db import models
from workouts.managers import WorkoutQuerySet

from .enums import WorkoutTypeOptions


class Workout(models.Model):
    trainer = models.ForeignKey("users.Trainer", on_delete=models.CASCADE)
    client = models.ForeignKey("clients.Client", on_delete=models.CASCADE)

    time = models.DateTimeField()
    duration = models.IntegerField(
        null=True, blank=True, help_text="Workout duration in minutes."
    )
    type = models.CharField(max_length=255, choices=WorkoutTypeOptions.choices)
    description = models.CharField(max_length=512, null=True, blank=True)

    done = models.BooleanField(default=False)
    client_came = models.BooleanField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = WorkoutQuerySet.as_manager()

    def __str__(self):
        return str(self.client) + " " + self.type


class WorkoutExercise(models.Model):
    workout = models.ForeignKey(
        Workout, related_name="exercises", on_delete=models.CASCADE
    )

    # TODO break beetween exercises
    name = models.CharField(max_length=255)
    num_of_sets = models.IntegerField(null=True, blank=True)
    num_of_reps = models.IntegerField(null=True, blank=True)

    description = models.CharField(max_length=512, null=True, blank=True)
