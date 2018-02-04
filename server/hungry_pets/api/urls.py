from django.conf.urls import url
from django.urls import path

from hungry_pets.api.handlers import users, pets, bookmarks

urlpatterns = [
    path('user/', users.CurrentUserHandler.as_view({'get': 'retrieve', 'post': 'create'})),
    path('pets/', pets.PetListHandler.as_view()),
    path('bookmarks/', bookmarks.BookmarkHandler.as_view({'put': 'update'})),
    url('^login$', users.LoginHandler.as_view(), name='login')
]
