from django.contrib import admin

from .models import Workout, WorkoutExercise


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = [
        "client",
        "trainer",
        "time",
        "duration",
        "type",
        "done",
        "client_came",
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
