from django.db import models

from hungry_pets.models import BaseModelMixin


class Bookmark(BaseModelMixin):
    user = models.ForeignKey('hungry_pets.User', related_name='bookmarks', on_delete=models.CASCADE)
    pet = models.ForeignKey('hungry_pets.Pet', related_name='bookmarks', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'pet',)
