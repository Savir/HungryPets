import glob
import io
import os
import random

import shutil
from PIL import Image
from django.core.files.base import ContentFile
from django.db import migrations
from django.conf import settings

races_and_breeds = {
    'cat': ['angora', 'siamese', 'persian'],
    'dog': ['german shepherd', 'labrador', 'beagle', 'poodle'],
}

pet_names = [
    'socks',
    'coco',
    'molly',
    'lulu',
    'buddy',
    'simba'
]


def populate_breeds(apps, schema_editor):
    Species_CLS = apps.get_model('hungry_pets', 'Species')
    Breed_CLS = apps.get_model('hungry_pets', 'Breed')
    for species_name, breeds in races_and_breeds.items():
        species, _ = Species_CLS.objects.get_or_create(name=species_name)
        breed, _ = Breed_CLS.objects.get_or_create(species=species, name=random.choice(breeds))


def _make_a_pet(apps):
    Breed_CLS = apps.get_model('hungry_pets', 'Breed')
    breed = random.choice(Breed_CLS.objects.all())
    Pet_CLS = apps.get_model('hungry_pets', 'Pet')
    pet_fixture_images_dir = os.path.abspath(
        os.path.join(os.path.dirname(__file__), 'pet_fixture_images/')
    )
    image_paths = glob.glob(pet_fixture_images_dir + '/' + breed.species.name + "*.*")
    image_path = random.choice(image_paths)
    img = Image.open(image_path)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')

    adopt = bool(random.randint(0, 1))
    pet = Pet_CLS.objects.create(
        breed=breed,
        name=random.choice(pet_names),
        price=0 if adopt else "%.2f" % (random.randint(200, 2000) / 100)
    )
    pet.img.save('img_1.png', ContentFile(img_bytes.getvalue()), save=True)


def populate_pets(apps, schema_editor):
    Pet_CLS = apps.get_model('hungry_pets', 'Pet')
    while Pet_CLS.objects.count() < 10:
        _make_a_pet(apps)


def populate_bookmarks(apps, schema_editor):
    Pet_CLS = apps.get_model('hungry_pets', 'Pet')
    User_CLS = apps.get_model('hungry_pets', 'User')
    Bookmark_CLS = apps.get_model('hungry_pets', 'Bookmark')

    while Bookmark_CLS.objects.count() < 5:
        pet = random.choice(Pet_CLS.objects.all())
        user = random.choice(User_CLS.objects.all())
        Bookmark_CLS.objects.get_or_create(pet=pet, user=user)


def drop_pets(apps, schema_editor):
    Species_CLS = apps.get_model('hungry_pets', 'Species')
    Species_CLS.objects.all().delete()
    Breed_CLS = apps.get_model('hungry_pets', 'Breed')
    Breed_CLS.objects.all().delete()
    Pet_CLS = apps.get_model('hungry_pets', 'Pet')
    Pet_CLS.objects.all().delete()
    Bookmark_CLS = apps.get_model('hungry_pets', 'Bookmark')
    Bookmark_CLS.objects.all().delete()
    pet_images_dir = os.path.abspath(os.path.join(settings.MEDIA_ROOT, './pet_images'))
    shutil.rmtree(pet_images_dir, ignore_errors=True)


class Migration(migrations.Migration):
    dependencies = [
        ('hungry_pets', '0002_pet_related_fields'),
    ]

    operations = [
        migrations.RunPython(populate_breeds, reverse_code=migrations.RunPython.noop),
        migrations.RunPython(populate_pets, reverse_code=migrations.RunPython.noop),
        migrations.RunPython(populate_bookmarks, reverse_code=migrations.RunPython.noop),
        migrations.RunPython(migrations.RunPython.noop, reverse_code=drop_pets),
    ]
