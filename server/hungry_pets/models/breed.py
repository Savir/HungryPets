from django.db import models

from hungry_pets.models import BaseModelMixin


class Breed(BaseModelMixin):
    name = models.CharField(max_length=100, null=False, blank=True, default="")
    species = models.ForeignKey('hungry_pets.Species', related_name='breeds', on_delete=models.CASCADE)

    class Meta:
        unique_together = ("name", "species")

