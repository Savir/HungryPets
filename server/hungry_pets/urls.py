from django.conf.urls import include, url
from django.urls import path
from hungry_pets.views.hungry_pets import hungry_pets as hungry_pets_renderer
from hungry_pets.views.index import IndexView
from hungry_pets.views.signup import SignUpView

urlpatterns = [
    # path('', IndexView.as_view(), name='index'),
    # path('login', LoginView.as_view(), name='login'),
    path('api/', include('hungry_pets.api.urls')),
    url('^.*$', hungry_pets_renderer),
]
