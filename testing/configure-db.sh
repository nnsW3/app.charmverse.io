#!/bin/bash
PGPASSWORD=postgres psql -h localhost -U postgres -c "DROP DATABASE charmversetest;"
PGPASSWORD=postgres psql -h localhost -U postgres -c "CREATE DATABASE charmversetest;"
DATABASE_URL=postgres://postgres:postgres@localhost:5432/charmversetest npx prisma migrate dev
echo -e "Database created"