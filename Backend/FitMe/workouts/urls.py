from django.urls import include, path, re_path

from workouts.views import (
    trainer_stats,
    workout_client_came,
    workout_done,
    workouts_list,
)

urlpatterns = [
    path("", workouts_list),
    path("workout-done/", workout_done, name="workout-done"),
    path("workout-client-came/", workout_client_came, name="workout-client-came"),
    path("trainer-stats/", trainer_stats, name="trainer-stats"),
]
