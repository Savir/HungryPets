from django.conf.urls import url
from django.urls import path

from hungry_pets.api.handlers import users, pets, bookmarks

# noinspection PyCallByClass,PyTypeChecker
urlpatterns = [
    path('user/', users.UserHandler.as_view({
        'get': 'retrieve',
        'post': 'create',
        'put': 'partial_update',
    })),
    path('pets/', pets.PetListHandler.as_view()),
    path('bookmarks/', bookmarks.BookmarkHandler.as_view({'put': 'update'})),
    url('^login$', users.LoginHandler.as_view(), name='login')
]
