from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from hungry_pets.models import BaseModelMixin
from hungry_pets.models.user_manager import UserManager


class User(AbstractUser, BaseModelMixin):
    """Extend the default Django's user model """
    username = None
    email = models.EmailField(unique=True)
    phone_number = PhoneNumberField(blank=True, null=True)
    # Custom manager:
    objects = UserManager()
    #
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
