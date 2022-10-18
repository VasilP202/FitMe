from django.db import models


class SexOptions(models.TextChoices):
    MALE = "MALE"
    FEMALE = "FEMALE"
