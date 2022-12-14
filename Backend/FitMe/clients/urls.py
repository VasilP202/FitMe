from django.urls import path

from .views import (
    client_personal_info,
    clients_detail,
    clients_list,
    measurement_list,
    workout_client_stats,
)

urlpatterns = [
    path("", clients_list, name="clients-list"),
    path("<int:client_id>/", clients_detail, name="clients-detail"),
    path("workout-stats/", workout_client_stats, name="client-workout-stats"),
    path("measurement-list/", measurement_list, name="measurement-list"),
    path("personal-info/", client_personal_info, name="client-personal-info"),
]
