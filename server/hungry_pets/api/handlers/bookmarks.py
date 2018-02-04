from rest_framework import viewsets

from rest_framework.response import Response

# noinspection PyRedundantParentheses
from hungry_pets.models import Bookmark


class BookmarkHandler(viewsets.ModelViewSet):
    def update(self, request, *args, **kwargs):
        if Bookmark.objects.filter(user=request.user, pet_id=request.data['pet_id']).exists():
            Bookmark.objects.filter(user=request.user, pet_id=request.data['pet_id']).delete()
        else:
            Bookmark.objects.create(user=request.user, pet_id=request.data['pet_id'])
        return Response({
            'is_bookmarked':  Bookmark.objects.filter(user=request.user, pet_id=request.data['pet_id']).exists()
        })

