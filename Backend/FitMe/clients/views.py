from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from .models import Client, ClientMeasurement
from .serializers import (
    ClientMeasurementSerializer,
    ClientPhotoSerializer,
    ClientSerializer,
    GetClientSerializer,
)


@api_view(["GET", "POST"])
def clients_list(request):
    if request.method == "GET":
        clients = Client.objects.filter(trainer=request.user.trainer)
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = ClientSerializer(
            data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def clients_detail(request, client_id):
    try:
        client = Client.objects.get(id=client_id)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = GetClientSerializer(client)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = ClientSerializer(
            client, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def client_upload_photo(request):
    if request.method == "POST":
        serializer = ClientPhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def workout_client_stats(request):
    if request.method == "GET":
        if request.user.is_client:
            try:
                client = Client.objects.get(user=request.user)
            except Client.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:  # trainer
            client_id = int(request.query_params.get("id"))
            try:
                client = Client.objects.get(id=client_id)
            except Client.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        data = {
            "workouts_count": client.get_workouts_count(),
            "workouts_absent_count": client.get_workouts_absent_count(),
            "workouts_this_month_count": client.get_workouts_count_this_month(),
            "workouts_three_months_count": client.get_workouts_count_three_months(),
            "workouts_six_months_count": client.get_workouts_count_six_months(),
            "workouts_one_year_count": client.get_workouts_count_year(),
            "workouts_by_type_count": list(client.get_annotate_by_workout_type()),
        }
        return Response(data)


@api_view(["GET", "POST"])
def measurement_list(request):
    if request.method == "GET":
        if request.user.is_client:
            measurements = ClientMeasurement.objects.filter(
                client__user=request.user)
        else:  # trainer
            client_id = int(request.query_params.get("id"))
            measurements = ClientMeasurement.objects.filter(
                client_id=client_id)
        serializer = ClientMeasurementSerializer(measurements, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        if request.user.is_client:
            serializer = ClientMeasurementSerializer(
                data=request.data, context={"request": request}
            )
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def client_personal_info(request):
    if request.method == "GET":
        if request.user.is_client:
            serializer = GetClientSerializer(request.user.client)
        else:  # trainer
            client_id = int(request.query_params.get("id"))
            try:
                client = Client.objects.get(id=client_id)
                serializer = GetClientSerializer(client)
            except Client.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data)
