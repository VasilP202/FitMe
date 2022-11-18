from django.db import models
from django.contrib.auth.models import AbstractUser


""" class User(AbstractUser):
    is_client = models.BooleanField(default=False)
    is_trainer = models.BooleanField(default=False)


class Client(models.Model):
    user = models.OneToOneField(
        User, primary_key=True, on_delete=models.CASCADE)


class Trainer(models.Model):
    user = models.OneToOneField(
        User, primary_key=True, on_delete=models.CASCADE)
 """