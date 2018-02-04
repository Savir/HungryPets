from django.contrib.auth.forms import UserCreationForm

from hungry_pets.models import User


class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'password1',
            'password2'
        )
