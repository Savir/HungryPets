from rest_framework import serializers

from hungry_pets.models import Breed
from .species import SpeciesSerializer


class BreedSerializer(serializers.ModelSerializer):
    species = SpeciesSerializer()

    class Meta:
        model = Breed
        depth = 1
        fields = (
            'id',
            'name',
            'species',
        )
