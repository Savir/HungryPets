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

# S3 Info to serve Media in non-local environments
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_BUCKET', default='hungry-pets')
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', default=None)
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY', default=None)
S3_URL = 'https://%s.s3.amazonaws.com/' % AWS_STORAGE_BUCKET_NAME
AWS_QUERYSTRING_AUTH = False

# serve media files from the filesystem by default on dev environments
MEDIA_ROOT = ROOT_DIR + '/media/'
MEDIA_URL = '/media/'
DEPLOYMENT = os.environ.get('DEPLOYMENT', default='LOCAL')
if DEPLOYMENT == 'REMOTE':
    # store user uploaded files using amazon s3 only in actual deployments
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    MEDIA_URL = S3_URL
