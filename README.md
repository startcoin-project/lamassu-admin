# lamassu-admin

Lamassu admin server. First part of Lamassu stack you need to install.

## Installation

```sh
git clone git@github.com:lamassu/lamassu-admin.git
cd lamassu-admin
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

Then, [open it](http://localhost:8081).

## Deployment

### Heroku
Both `lamassu-admin` and [`lamassu-server`](https://github.com/lamassu/lamassu-server)
are deployable to Heroku.

First, you need to get a [Heroku](https://heroku.com) account and install the
Heroku toolkit.

### The easy way
`deploy-all.sh` is an easy installation and deployment script. You can run it
standalone, without cloning `lamassu-admin`. It'll clone both repositories to
your current working directory and deploy them to Heroku:

```sh
mkdir lamassu
curl https://raw.github.com/lamassu/lamassu-admin/master/deploy-all.sh > deploy-all.sh
chmod +x deploy-all.sh
./deploy-all.sh
```

You can deploy updates to your applications by rerunning `deploy-all.sh`.

### A bit harder way
You can also clone and deploy each app individually. To do that, clone both
`lamassu-admin` and `lamassu-server`.

```sh
git clone https://github.com/lamassu/lamassu-admin.git
git clone https://github.com/lamassu/lamassu-server.git
```

Next, deploy `lamassu-admin`:

```sh
cd lamassu-admin
./deploy.sh
```

Visit the deployed application to configure your Lamassu ATM. Make sure to input
all required API keys.

Next, to deploy `lamassu-server` you need to grab `DATABASE_URL` for the Postgres
database our deployment script created.

```sh
db=$(heroku config:get DATABASE_URL)
```

Then, go to `lamassu-server` and deploy it:

```sh
DATABASE_URL="$db" ./deploy.sh
```

You need to pass `DATABASE_URL` to it since both `lamassu-admin` and `lamassu-server`
use the same database.

Both applications should be deployed and running.
