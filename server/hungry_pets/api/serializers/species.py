from rest_framework import serializers

from hungry_pets.models import Species


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        depth = 1
        fields = (
            'id',
            'name',
        )
