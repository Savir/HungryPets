from django.db import models

from hungry_pets.models import BaseModelMixin


class Species(BaseModelMixin):
    name = models.CharField(max_length=100, null=False, blank=True, unique=True, default="")
