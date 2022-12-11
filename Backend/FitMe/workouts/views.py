from datetime import datetime

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .helpers import get_date
from .models import Workout
from .serializers import (
    CreateWorkoutSerializer,
    GetWorkoutsSerializer,
    WorkoutClientCameSerializer,
    WorkoutDoneSerializer,
)


@api_view(["GET", "POST"])
def workouts_list(request):
    if request.method == "GET":
        workouts = []  # TODO custom serializers for 2 types of users
        date = get_date(request.query_params.get("date"))
        if request.user.is_trainer:
            workouts = Workout.objects.filter(trainer=request.user.trainer).by_date(
                date
            )
        elif request.user.is_client:
            if request.user.has_client:
                workouts = Workout.objects.filter(client=request.user.client).by_date(
                    date
                )

        serializer = GetWorkoutsSerializer(
            workouts, context={"request": request}, many=True
        )

        return Response(serializer.data)

    elif request.method == "POST":
        serializer = CreateWorkoutSerializer(
            data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def workout_done(request):
    if request.method == "POST":
        serializer = WorkoutDoneSerializer(data=request.data)
        if serializer.is_valid():
            try:
                workout = Workout.objects.get(id=serializer.data["workout_id"])
            except Workout.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            workout.done = serializer.data["workout_done"]
            workout.save()
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def workout_client_came(request):
    if request.method == "POST":
        serializer = WorkoutClientCameSerializer(data=request.data)
        if serializer.is_valid():
            try:
                workout = Workout.objects.get(id=serializer.data["workout_id"])
            except Workout.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            workout.client_came = serializer.data["client_came"]
            workout.save()
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
