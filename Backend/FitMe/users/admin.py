from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import Trainer


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "username", "email", "date_joined"]

    def first_name(self, obj):
        return obj.user.first_name

    def last_name(self, obj):
        return obj.user.last_name

    def username(self, obj):
        return obj.user.username

    def email(self, obj):
        return obj.user.email

    def date_joined(self, obj):
        return obj.user.date_joined
