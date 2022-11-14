from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Workout
from .serializers import WorkoutSerializer, WorkoutDoneSerializer


@api_view(["GET", "POST"])
def workouts_list(request):
    if request.method == "GET":
        workouts = Workout.objects.all()
        serializer = WorkoutSerializer(
            workouts, context={"request": request}, many=True)

        return Response(serializer.data)

    elif request.method == "POST":
        serializer = WorkoutSerializer(data=request.data)
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
