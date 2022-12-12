from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    CustomObtainTokenPairView,
    RegistrationView,
    get_trainer_personal_info,
    get_user_is_trainer,
)

urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("login/", CustomObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user-is-trainer/", get_user_is_trainer, name="user_is_trainer"),
    path(
        "trainer-personal-info/",
        get_trainer_personal_info,
        name="trainer-personal-info",
    ),
]
