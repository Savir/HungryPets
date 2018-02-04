from django.conf.urls import url
from django.urls import path

from hungry_pets.api.handlers import users
from hungry_pets.api.handlers import pets

urlpatterns = [
    path('user/', users.CurrentUserHandler.as_view({'get': 'retrieve', 'post': 'create'})),
    path('pets/', pets.PetListHandler.as_view()),
    url('^login$', users.LoginHandler.as_view(), name='login')
]
