#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER hungry_pets WITH NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD 'hungry_p3ts';
    CREATE DATABASE hungry_pets;
    GRANT ALL PRIVILEGES ON DATABASE hungry_pets TO hungry_pets;
EOSQL