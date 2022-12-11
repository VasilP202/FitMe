from django.urls import path

from .views import (
    client_personal_info,
    client_upload_photo,
    clients_detail,
    clients_list,
    measurement_list,
    workout_client_stats,
)

urlpatterns = [
    path("", clients_list, name="clients-list"),
    path("<int:client_id>/", clients_detail, name="clients-detail"),
    path(
        "<int:client_id>/upload-photo/", client_upload_photo, name="client-upload-photo"
    ),
    path("workout-stats/", workout_client_stats, name="client-workout-stats"),
    path("measurement-list/", measurement_list, name="measurement-list"),
    path("personal-info/", client_personal_info, name="client-personal-info"),
]
