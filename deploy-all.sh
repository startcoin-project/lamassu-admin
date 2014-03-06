#!/usr/bin/env bash

function clone_or_update() {
  repo="$1"
  branch="$2"
  if [ -d $repo ]; then
    cd $repo
    git fetch origin -v
    git checkout $2
    git stash
    git rebase origin/$2
    git stash pop
    cd ..
  else
    git clone "git@github.com:lamassu/$repo"".git" -b "$branch"
    if [ $? -ne 0 ]; then
      echo "Unable to clone $repo"
      exit 1
    fi
  fi
}

echo "Cloning lamassu-admin"
clone_or_update lamassu-admin newnew
# Am I the only one who thinks Bash looks kinda like Ruby sometimes?

echo "Cloning lamassu-server"
clone_or_update lamassu-server master

echo "Deploying lamassu-admin"
cd lamassu-admin
./deploy.sh
db=$(heroku config:get DATABASE_URI)

cd ../lamassu-server
heroku config:set DATABASE_URL="$db"
./deploy.sh
cd ..
