from django.views.generic import CreateView

from hungry_pets.forms.registration import RegistrationForm


class SignUpView(CreateView):
    form_class = RegistrationForm
    template_name = 'signup.html'
