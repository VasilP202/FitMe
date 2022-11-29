# Generated by Django 4.1.2 on 2022-11-23 19:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_trainer"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("clients", "0002_client_client_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="client",
            name="client_user",
        ),
        migrations.AddField(
            model_name="client",
            name="trainer",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="clients",
                to="users.trainer",
            ),
        ),
        migrations.AddField(
            model_name="client",
            name="user",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
