from datetime import datetime, timedelta


def get_date(date_string: str | None):
    if date_string is None:
        return datetime.today().date()

    datetime_obj = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%f%z") + timedelta(
        hours=1
    )
    return datetime_obj.date()
