# Generated by Django 4.1.2 on 2022-10-18 17:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("clients", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Workout",
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
                ("time", models.DateTimeField()),
                (
                    "duration",
                    models.IntegerField(
                        blank=True, help_text="Workout duration in minutes.", null=True
                    ),
                ),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("Strength training", "Strength Training"),
                            ("High-intensity interval training", "Hiit"),
                            ("High-intensity circuit training", "Hict"),
                            ("High-intensity strength training", "Hist"),
                            ("Powerbuilding", "Powerbuilding"),
                            ("Low-intensity cardio", "Lic"),
                            ("Aerobic", "Aerobic"),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "description",
                    models.CharField(blank=True, max_length=512, null=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "client",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="clients.client"
                    ),
                ),
            ],
        ),
    ]