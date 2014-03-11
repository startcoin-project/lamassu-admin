#!/usr/bin/env bash

function exists() {
  which $1 > /dev/null 2>&1
}

function fail() {
  echo $1
  echo "Please contact Lamassu support (support@lamassu.is), including command output"
  exit 4
}

function upstart() {
  service=$1
  cmd=$2

  cat > "/etc/init/$service" <<EOF
exec $2
respawn
start on startup
EOF
}

echo "Hello! This script will install Lamassu stack, including PostgreSQL on this machine."

if [ "$(whoami)" != "root" ]; then
  echo "This script has to be run as \`root\`"
  exit 3
fi

prefix="/usr/local"
node="http://nodejs.org/dist/v0.10.26/node-v0.10.26-linux-x64.tar.gz"

# First detect our package manager. Fail early if we don't support it.
install=""

if exists apt-get; then
  install="apt-get install -y postgresql-9.1"
fi

if [ -z "$install" ]; then
  echo "Your package manager isn't supported"
  echo "This script currently supports apt-get"
  exit 1
fi

# Then detect our service management system. Also fail early if we don't
# support it.
# Remark: `upstart` appears to be going away from Ubuntu in lieu of `systemd`.
service=""

if exists start && [ -d "/etc/init" ]; then
  service="upstart"
fi

if [ -z "$service" ]; then
  echo "Your service manager isn't supported"
  echo "This script currently supports upstart"
  exit 2
fi

# Install PostgreSQL with the package manager we found.
echo "Okay, running: $install"
$install

if [ $? -ne 0 ]; then
  fail "PostgreSQL installation failed"
fi

# Set up users and databases in Postgres.
# Remark: do we want lamassu to be a super user?
password=$(dd if=/dev/urandom bs=30 count=1 | base64)
su - postgres <<EOF
  psql -c "CREATE ROLE lamassu WITH SUPERUSER PASSWORD '$password';"
  createdb -O lamassu lamassu
EOF

echo "Okay, now fetching and installing Node.js"

# Install node in $prefix
curl "$node" | tar -C"$prefix" -zxf-

if [ $? -ne 0 ]; then
  fail "Node.js installation failed"
fi

# Install Lamassu stack
npm -g install lamassu-server lamassu-admin

if [ "$service" == "upstart" ]; then
  upstart "lamassu-server" "lamassu-server"
  upstart "lamassu-admin" "lamassu-admin"
fi

# Bootstrap lamassu database
# XXX: this is a bit of a hack since it relies on `database/lamassu.sql` being
# in `lamassu-admin` package. We should find a better way (for example running
# `lamassu-admin bootstrap`).
# We also have to use `-h 127.0.0.1` because the default type of authentication
# for `local` connection is `peer`, which checks username of the user running
# `psql` command.
npm explore -g lamassu-admin 'cat database/lamassu.sql' |
  PGPASSWORD="$password" psql -h 127.0.0.1 lamassu lamassu
