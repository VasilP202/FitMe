from django.contrib import admin

from .models import Workout, WorkoutExercise


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = [
        "client",
        "time",
        "duration",
        "type",
        "done",
        "description",
    ]


@admin.register(WorkoutExercise)
class WorkoutExerciseAdmin(admin.ModelAdmin):
    list_display = [
        "workout",
        "name",
        "num_of_sets",
        "num_of_reps",
        "description",
    ]
