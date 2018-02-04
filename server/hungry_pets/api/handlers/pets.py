from django.db.models import Prefetch
from rest_framework import generics

from hungry_pets.api.serializers.pets import PetListSerializer
from hungry_pets.models import Pet, Bookmark


class PetListHandler(generics.ListAPIView):
    serializer_class = PetListSerializer

    # noinspection PyArgumentList
    def get_queryset(self):
        user = self.request.user

        pets_q = Pet.objects.all().order_by('name')
        pets_q = pets_q.select_related(
            'breed',
            'breed__species'
        )
        bookmarks_qset = Bookmark.objects.none() if user.is_anonymous else Bookmark.objects.all().filter(user=user)
        pets_q = pets_q.prefetch_related(
            Prefetch('bookmarks', queryset=bookmarks_qset)
        )
        return pets_q
