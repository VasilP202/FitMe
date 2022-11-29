import datetime

from django.db import models


class WorkoutQuerySet(models.QuerySet):
    def by_date(self, date: datetime.date):
        return self.filter(time__date=date)
