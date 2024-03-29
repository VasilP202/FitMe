# Generated by Django 4.1.2 on 2022-12-07 16:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("clients", "0003_remove_client_client_user_client_trainer_client_user"),
    ]

    operations = [
        migrations.CreateModel(
            name="ClientMeasurement",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateTimeField()),
                ("weight", models.FloatField()),
                (
                    "client",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="clients.client"
                    ),
                ),
            ],
        ),
    ]
