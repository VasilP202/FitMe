from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Client

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
