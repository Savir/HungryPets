from django.db import models


class BaseModelMixin(models.Model):
    """base model adding created/updated and deleted times to all models
    """
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    # support soft deletes
    deleted = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
