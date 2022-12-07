from clients.models import Client
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import Trainer

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    is_client = serializers.BooleanField()
    is_trainer = serializers.BooleanField()

    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "password2",
            "email",
            "first_name",
            "last_name",
            "is_client",
            "is_trainer",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords did not match."})
        if attrs["is_client"] == False and attrs["is_trainer"] == False:
            raise serializers.ValidationError({"role": "Select one of the roles."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            is_client=validated_data["is_client"],
            is_trainer=validated_data["is_trainer"],
        )
        user.set_password(validated_data["password"])

        if user.is_trainer:
            trainer = Trainer.objects.create(user=user)
            trainer.save()

        elif user.is_client:
            try:
                # Trainer already added new Client
                client = Client.objects.get(email=user.email)
                # Bind user and client together
                client.user = user
                client.save()
            except Client.DoesNotExist:
                pass

        user.save()
        return user


class TrainerSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.CharField(source="user.email")

    class Meta:
        model = Trainer
        fields = [
            "first_name",
            "last_name",
            "email",
        ]
