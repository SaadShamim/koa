#!/bin/bash

apt-get update
sudo apt-get -y install postgresql postgresql-contrib
sudo -u postgres psql -d template1 << EOF
CREATE USER admin WITH PASSWORD 'pumpup';
CREATE DATABASE testdb;
GRANT ALL PRIVILEGES ON DATABASE testdb to admin;
EOF