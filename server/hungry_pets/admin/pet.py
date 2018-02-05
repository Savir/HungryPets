from django.contrib import admin
from django.utils.html import format_html

from hungry_pets.models import Pet, Bookmark


# noinspection PyMethodMayBeStatic
@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'species_name', 'for_adoption')
    readonly_fields = ('img_tag', 'favorited_by')

    def species_name(self, obj):
        if obj.breed and obj.breed.species:
            return obj.breed.species.name
        return ""

    def img_tag(self, obj):
        return format_html(
            '<img src="%s" max-width="150" max-height="150" />' % obj.img.url,
        )

    def favorited_by(self, obj):
        bookmarks_q = Bookmark.objects.filter(pet=obj).select_related('user').order_by('user__email')
        return format_html(
            '<br>'.join(
                bookmarks_q.values_list('user__email', flat=True)
            )
        )

    def for_adoption(self, obj):
        return obj.price == 0

    for_adoption.boolean = True
