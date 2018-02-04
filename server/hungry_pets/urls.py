from django.conf.urls import include, url
from django.urls import path
import hungry_pets.views

urlpatterns = [
    # path('', IndexView.as_view(), name='index'),
    # path('login', LoginView.as_view(), name='login'),
    path('api/', include('hungry_pets.api.urls')),
    url('^.*$', hungry_pets.views.hungry_pets_spa),
]
