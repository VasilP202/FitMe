from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import CustomObtainTokenPairView, RegistrationView

urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("login/", CustomObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
