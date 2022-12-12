from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Trainer
from .serializers import (
    CustomTokenObtainPairSerializer,
    RegistrationSerializer,
    TrainerSerializer,
)

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


@api_view(["GET"])
def get_trainer_personal_info(request):
    try:
        trainer = Trainer.objects.get(user=request.user)
    except Trainer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TrainerSerializer(trainer)
    return Response(serializer.data)
