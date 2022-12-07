from django.contrib import admin

from .models import Client, ClientMeasurement, TestClientPhoto


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = [
        "get_full_name",
        "trainer",
        "get_age",
        "birth_date",
        "phone",
        "address",
        "email",
        "created_at",
    ]

    def get_full_name(self, obj):
        return obj.full_name

    def get_age(self, obj):
        return obj.age


@admin.register(ClientMeasurement)
class ClientMeasurementAdmin(admin.ModelAdmin):
    list_display = [
        "client",
        "date",
        "weight",
    ]


@admin.register(TestClientPhoto)
class ClientPhotoAdmin(admin.ModelAdmin):
    list_display = ["client", "image_path", "created_at"]
