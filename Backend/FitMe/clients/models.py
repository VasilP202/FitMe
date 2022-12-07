from datetime import date, datetime, timedelta
from typing import Optional

from dateutil.relativedelta import relativedelta
from django.db import models
from django.db.models import Count
from workouts.managers import WorkoutQuerySet

from .enums import SexOptions


class Client(models.Model):
    user = models.OneToOneField(
        "users.User", on_delete=models.CASCADE, null=True, blank=True
    )

    trainer = models.ForeignKey(
        "users.Trainer", related_name="clients", on_delete=models.SET_NULL, null=True
    )

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    sex = models.CharField(max_length=255, choices=SexOptions.choices)
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.first_name + " " + self.last_name + f" ({self.pk})"

    @property
    def full_name(self):
        return self.first_name + " " + self.last_name

    @property
    def age(self) -> Optional[int]:
        if self.birth_date is not None:
            today = date.today()
            return (
                today.year
                - self.birth_date.year
                - (
                    (today.month, today.day)
                    < (self.birth_date.month, self.birth_date.day)
                )
            )

    def get_workouts_count(self) -> int:
        return self.workouts.count()

    def get_workouts_absent_count(self) -> int:
        return self.workouts.filter(client_came=False).count()

    def get_workouts_count_this_month(self) -> int:
        now = datetime.now()
        month_first = datetime(month=now.month, year=now.year, day=1)
        return self.workouts.filter(
            updated_at__gte=month_first, client_came=True
        ).count()

    def get_workouts_count_three_months(self) -> int:
        months_three = datetime.now() - relativedelta(months=3)
        return self.workouts.filter(
            updated_at__gte=months_three, client_came=True
        ).count()

    def get_workouts_count_six_months(self) -> int:
        months_six = datetime.now() - relativedelta(months=6)
        return self.workouts.filter(
            updated_at__gte=months_six, client_came=True
        ).count()

    def get_workouts_count_year(self) -> int:
        months_twelve = datetime.now() - relativedelta(months=12)
        return self.workouts.filter(
            updated_at__gte=months_twelve, client_came=True
        ).count()

    def get_annotate_by_workout_type(self) -> WorkoutQuerySet:
        return (
            self.workouts.filter(client_came=True)
            .values("type")
            .annotate(count=Count("type"))
        )


class ClientPhotoSet(models.Model):
    client = models.ForeignKey(
        Client, related_name="photo_sets", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def upload_to(instance, filename):
    return "photos/{client_id}/{filename}".format(
        client_id=instance.client_id, filename=filename
    )


class ClientPhoto(models.Model):
    photo_set = models.ForeignKey(
        ClientPhotoSet, related_name="photos", on_delete=models.CASCADE
    )
    image_path = models.ImageField(upload_to=upload_to, blank=True, null=True)


class TestClientPhoto(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    image_path = models.ImageField(upload_to=upload_to, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ClientMeasurement(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField()
    weight = models.FloatField()

    def __str__(self):
        return f"Measurement ({self.client.full_name})"
