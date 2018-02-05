import uuid as uuid

from django.db import models

from hungry_pets.models import BaseModelMixin


def get_pet_image(instance, filename):
    return "pet_images/%s/%s" % (
        instance.uuid,
        filename
    )


class Pet(BaseModelMixin):
    name = models.CharField(max_length=100)
    uuid = models.UUIDField(default=uuid.uuid4, null=False, blank=False, editable=False, unique=True)
    img = models.ImageField(upload_to=get_pet_image, null=True, blank=True, max_length=255)
    breed = models.ForeignKey('hungry_pets.Breed', related_name='pets', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name