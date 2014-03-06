# lamassu-admin

Lamassu admin server. First part of Lamassu stack you need to install.

## Installation

```sh
git clone git@github.com:lamassu/lamassu-admin.git
cd lamassu-admin
git checkout newnew
npm install
```

You also need a Postgres running. Postgres is required for storing configuration
of the remote server. Install Postgres with your package manager of choice, then:

```sh
sudo su - postgres
createuser --superuser lamassu
createdb -U lamassu lamassu
```

Then you need SQL scripts to seed initial configs. They are under `/database`.
You can bootstrap your database by running:

```sh
psql lamassu lamassu < database/lamassu.sql
```

## Configuration
You'll be able to configure your stack when you start the server for the first
time.

## Running

```sh
node app.js
```

Then, [open it](http://localhost:8080).
