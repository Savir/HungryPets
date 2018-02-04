# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ROOT_DIR = os.path.dirname(BASE_DIR)
STATIC_ROOT = ROOT_DIR + '/public/'

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.abspath(os.path.join(ROOT_DIR, 'static/'))
]
# serve media files from the filesystem by default on dev environments
MEDIA_ROOT = ROOT_DIR + '/media/'
MEDIA_URL = '/media/'
# Whitenoise compression. See: http://whitenoise.evans.io/en/stable/#quickstart-for-django-apps
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
