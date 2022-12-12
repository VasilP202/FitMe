from datetime import datetime, timedelta

from dateutil.relativedelta import relativedelta
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Count

from clients.enums import SexOptions
from clients.models import Client
from workouts.managers import WorkoutQuerySet


class User(AbstractUser):
    is_client = models.BooleanField(default=False)
    is_trainer = models.BooleanField(default=False)

    @property
    def has_client(self):
        return Client.objects.filter(user=self).exists()


class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.user.username

    """ Trainer's clients stats """

    def get_clients_count(self) -> int:
        return self.clients.count()

    def get_clients_male_count(self) -> int:
        return self.clients.filter(sex=SexOptions.MALE).count()

    def get_clients_female_count(self) -> int:
        return self.clients.filter(sex=SexOptions.FEMALE).count()

    def get_clients_last_month(self) -> int:
        one_month = datetime.now() - relativedelta(months=1)
        return self.clients.filter(created_at__gte=one_month).count()

    def get_clients_last_three_months(self) -> int:
        three_months = datetime.now() - relativedelta(months=3)
        return self.clients.filter(created_at__gte=three_months).count()

    def get_clients_last_six_months(self) -> int:
        six_months = datetime.now() - relativedelta(months=6)
        return self.clients.filter(created_at__gte=six_months).count()

    def get_clients_last_year(self) -> int:
        one_year = datetime.now() - relativedelta(months=12)
        return self.clients.filter(created_at__gte=one_year).count()

    def get_clients_age_category_under_20(self) -> int:
        years20 = datetime.now() - relativedelta(years=20)
        return self.clients.filter(birth_date__gt=years20).count()

    def get_clients_age_category_20_to_30(self) -> int:
        years20 = datetime.now() - relativedelta(years=20)
        years30 = datetime.now() - relativedelta(years=30)
        return self.clients.filter(
            birth_date__lte=years20, birth_date__gt=years30
        ).count()

    def get_clients_age_category_30_to_40(self) -> int:
        years30 = datetime.now() - relativedelta(years=30)
        years40 = datetime.now() - relativedelta(years=40)
        return self.clients.filter(
            birth_date__lte=years30, birth_date__gt=years40
        ).count()

    def get_clients_age_category_40_to_50(self) -> int:
        years40 = datetime.now() - relativedelta(years=40)
        years50 = datetime.now() - relativedelta(years=50)
        return self.clients.filter(
            birth_date__lte=years40, birth_date__gt=years50
        ).count()

    def get_clients_age_category_above_50(self) -> int:
        years50 = datetime.now() - relativedelta(years=50)
        return self.clients.filter(birth_date__lte=years50).count()

    """ Trainer's workouts stats """

    def get_total_workouts_count(self) -> int:
        return self.workouts.count()

    def get_done_workouts_count(self) -> int:
        return self.workouts.filter(done=True).count()

    def get_workouts_absent_client_count(self) -> int:
        return self.workouts.filter(client_came=False).count()

    def get_workouts_count_this_month(self) -> int:
        now = datetime.now()
        month_first = datetime(month=now.month, year=now.year, day=1)
        return self.workouts.filter(updated_at__gte=month_first).count()

    def get_workouts_count_three_months(self) -> int:
        months_three = datetime.now() - relativedelta(months=3)
        return self.workouts.filter(updated_at__gte=months_three).count()

    def get_workouts_count_six_months(self) -> int:
        months_six = datetime.now() - relativedelta(months=6)
        return self.workouts.filter(updated_at__gte=months_six).count()

    def get_workouts_count_year(self) -> int:
        one_year = datetime.now() - relativedelta(months=12)
        return self.workouts.filter(updated_at__gte=one_year).count()

    def get_annotate_by_workout_type(self) -> "WorkoutQuerySet":
        return (
            self.workouts.filter(client_came=True)
            .values("type")
            .annotate(count=Count("type"))
        )
