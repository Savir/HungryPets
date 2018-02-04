import os
import urllib.parse

DATABASE_URL = os.environ.get('DATABASE_URL', default='postgres://hungry_pets:hungry_p3ts@localhost:5432/hungry_pets')

parsed_url = urllib.parse.urlparse(DATABASE_URL)
if parsed_url.scheme.lower() != 'postgres':
    raise ValueError("Database engine %s not accepted" % parsed_url.scheme)

DATABASES = {
    'default': {
        'ENGINE':   'django.db.backends.postgresql',
        'NAME':     parsed_url.path[1:] if parsed_url.path[0] == '/' else parsed_url.path,
        'USER':     parsed_url.username,
        'PASSWORD': parsed_url.password,
        'HOST':     parsed_url.hostname,
        'PORT':     parsed_url.port,
        'CONN_MAX_AGE': 600,
        'TEST_NAME': 'circle_test',
    }
}