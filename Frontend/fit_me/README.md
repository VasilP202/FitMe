# FitMe Backend

## Requirements

 - Python 3.10
 - pip

## Run

```shell
$ cd Backend
$ python -m venv .venv
$ source .venv/bin/activate     #.venv\Scripts\activate (Windows)
$ pip install -r requirements.txt
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```