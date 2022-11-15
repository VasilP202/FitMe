from http import client
from rest_framework import serializers
from .models import Workout


class GetWorkoutSerializer(serializers.Serializer):
    client = serializers.CharField(max_length=127)
    time = serializers.CharField(max_length=10)
    duration = serializers.CharField(max_length=10)
    type = serializers.CharField(max_length=65)


class WorkoutDoneSerializer(serializers.Serializer):
    workout_id = serializers.IntegerField()
    workout_done = serializers.BooleanField()


class GetWorkoutsSerializer(serializers.ModelSerializer):
    client_full_name = serializers.CharField(source="client.full_name")

    class Meta:
        model = Workout
        fields = [
            "pk",
            "client",
            "client_full_name",
            "time",
            "duration",
            "type",
            "description",
            "done",
            "client_came"
        ]


class CreateWorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = [
            "pk",
            "client",
            "time",
            "duration",
            "type",
            "description",
            "done",
            "client_came"
        ]
