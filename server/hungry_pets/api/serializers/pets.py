from rest_framework import serializers

from hungry_pets.models import Pet
from .breed import BreedSerializer


class PetListSerializer(serializers.ModelSerializer):
    breed_name = serializers.CharField(source='breed.name')
    species_name = serializers.CharField(source='breed.species.name')
    is_bookmarked = serializers.SerializerMethodField('is_bookmarked_func')

    # noinspection PyMethodMayBeStatic
    def is_bookmarked_func(self, pet):
        return pet.bookmarks.count() == 1

    class Meta:
        model = Pet
        depth = 1
        fields = (
            'id',
            'img',
            'name',
            'breed_name',
            'species_name',
            'price',
            'is_bookmarked',
        )


class PetSerializer(serializers.ModelSerializer):
    breed = BreedSerializer()
    is_bookmarked = serializers.SerializerMethodField('is_bookmarked_func')

    # noinspection PyMethodMayBeStatic
    def is_bookmarked_func(self, pet):
        return pet.bookmarks.count() == 1

    class Meta:
        model = Pet
        depth = 1
        fields = (
            'id',
            'img',
            'name',
            'breed',
            'price',
            'is_bookmarked',
        )
