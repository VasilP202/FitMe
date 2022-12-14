from datetime import datetime

from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import Trainer

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
        workouts = []
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
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def workouts_detail(request, workout_id):
    try:
        workout = Workout.objects.get(id=workout_id)
    except Workout.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        workout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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


@api_view(["GET"])
def trainer_stats(request):
    if request.method == "GET":
        trainer = Trainer.objects.last()
        try:
            trainer = Trainer.objects.get(user=request.user)
        except Trainer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {
            "clients_count": trainer.get_clients_count(),
            "clients_male_count": trainer.get_clients_male_count(),
            "clients_female_count": trainer.get_clients_female_count(),
            "clients_last_month_count": trainer.get_clients_last_month(),
            "clients_last_three_months_count": trainer.get_clients_last_three_months(),
            "clients_last_six_months_count": trainer.get_clients_last_six_months(),
            "clients_last_six_year_count": trainer.get_clients_last_year(),
            "clients_age_under_20": trainer.get_clients_age_category_under_20(),
            "clients_age_20_to_30": trainer.get_clients_age_category_20_to_30(),
            "clients_age_30_to_40": trainer.get_clients_age_category_30_to_40(),
            "clients_age_40_to_50": trainer.get_clients_age_category_40_to_50(),
            "clients_age_above_50": trainer.get_clients_age_category_above_50(),
            "workouts_scheduled_count": trainer.get_total_workouts_count(),
            "workouts_done_count": trainer.get_done_workouts_count(),
            "workouts_client_absent_count": trainer.get_workouts_absent_client_count(),
            "workouts_this_month_count": trainer.get_workouts_count_this_month(),
            "workouts_three_months_count": trainer.get_workouts_count_three_months(),
            "workouts_six_months_count": trainer.get_workouts_count_six_months(),
            "workouts_one_year_count": trainer.get_workouts_count_year(),
            "workouts_by_type_count": list(trainer.get_annotate_by_workout_type()),
        }
        return Response(data)
