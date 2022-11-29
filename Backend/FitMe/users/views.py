from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer, RegistrationSerializer

User = get_user_model()


class CustomObtainTokenPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


class RegistrationView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer


@api_view(["GET"])
def get_user_is_trainer(request):
    username = request.query_params.get("username")
    u = User.objects.get(username=username)
    return Response({"is_trainer": u.is_trainer})
