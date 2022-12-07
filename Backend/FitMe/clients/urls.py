from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path

from .views import (
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
]
