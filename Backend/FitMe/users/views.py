from .serializers import CustomTokenObtainPairSerializer, RegistrationSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User


class CustomObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer


class RegistrationView(CreateAPIView):
    queryset = User.objects.all()
    #permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer