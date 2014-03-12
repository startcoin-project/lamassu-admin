#!/usr/bin/env bash

function exists() {
  which $1 > /dev/null 2>&1
}

function fail() {
  echo $1
  echo "Please contact Lamassu support (support@lamassu.is), including "
  echo "command output and lamassu-debug.log file"
  exit 4
}

function upstart() {
  service=$1
  cmd=$2

  cat > "/etc/init/$service"".conf" <<EOF
exec $2
respawn
start on startup
env DATABASE_URL=postgres://lamassu:$password@localhost/lamassu
chdir $(npm -g explore $2 pwd)
EOF
}

echo "Hello! This script will install Lamassu stack, including "
echo "PostgreSQL on this machine."

if [ "$(whoami)" != "root" ]; then
  echo "This script has to be run as \`root\`"
  exit 3
fi

debug="lamassu-debug.log"
prefix="/usr/local"
node="http://nodejs.org/dist/v0.10.26/node-v0.10.26-linux-x64.tar.gz"

# First detect our package manager. Fail early if we don't support it.
update=""
install=""

if exists apt-get; then
  update="apt-get update -y && apt-get upgrade -y"
  install="apt-get install -y postgresql-9.1 libpq-dev git build-essential"
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

echo "Updating your system (this might take a while)..."
$update >> $debug 2>&1

[ $? -ne 0 ] && fail "Updating your system failed"

# Install PostgreSQL with the package manager we found.
echo "Installing PostgreSQL (this might take a while)..."
$install >> $debug 2>&1

[ $? -ne 0 ] && fail "PostgreSQL installation failed"

# Set up users and databases in Postgres.
# Remark: do we want lamassu to be a super user?
password=$(openssl rand -hex 32)
su - postgres >> $debug 2>&1 <<EOF
  dropdb lamassu 2>/dev/null
  dropuser lamassu 2>/dev/null
  psql -c "CREATE ROLE lamassu WITH LOGIN SUPERUSER PASSWORD '$password';"
  createdb -O lamassu lamassu
EOF

echo "Fetching and installing node.js..."

# Install node in $prefix
curl "$node" | tar -C"$prefix" --strip-components=1 -zxf-

[ $? -ne 0 ] && fail "Node.js installation failed"

echo "Installing Lamassu stack (this might take a while)..."
# Install Lamassu stack
npm -g install lamassu-server lamassu-admin >> $debug 2>&1

echo "Installing Lamassu services..."
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
echo "Bootstrapping PostgreSQL..."
npm explore -g lamassu-admin 'cat database/lamassu.sql' |
  PGPASSWORD="$password" psql -h 127.0.0.1 lamassu lamassu >> $debug 2>&1

[ $? -ne 0 ] && fail "Bootstrapping PostgreSQL failed"
