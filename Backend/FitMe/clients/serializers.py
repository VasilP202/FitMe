from django.contrib.auth import get_user_model
from rest_framework import serializers
from users.serializers import TrainerSerializer

from .models import (
    Client,
    ClientMeasurement,
    ClientPhoto,
    ClientPhotoSet,
    TestClientPhoto,
)

User = get_user_model()


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            "pk",
            "first_name",
            "last_name",
            "sex",
            "birth_date",
            "phone",
            "address",
            "email",
        ]

    def create(self, validated_data):
        request_user = self.context["request"].user

        client = Client.objects.create(**validated_data)
        if not request_user.is_anonymous:
            client.trainer = request_user.trainer

        try:
            # Client has already registered
            user = User.objects.get(email=validated_data["email"])
            client.user = user
        except User.DoesNotExist:
            pass

        client.save()
        return client


class GetClientSerializer(serializers.ModelSerializer):
    trainer = TrainerSerializer()

    class Meta:
        model = Client
        fields = [
            "pk",
            "first_name",
            "last_name",
            "sex",
            "birth_date",
            "phone",
            "address",
            "email",
            "trainer",
        ]


class ClientPhotoSerializer(serializers.ModelSerializer):
    image_path = serializers.ImageField(required=False)

    class Meta:
        model = TestClientPhoto
        fields = ["client", "image_path"]


class ClientMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientMeasurement
        fields = ["client", "date", "weight"]
        read_only_fields = ["client"]

    def create(self, validated_data):
        request_user = self.context["request"].user
        client_measurement = ClientMeasurement.objects.create(
            **validated_data, client=request_user.client
        )
        client_measurement.save()
        return client_measurement
