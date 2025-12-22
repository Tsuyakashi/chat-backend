#!/bin/bash

set -e

[ ! -f ./.env ] && echo ".env does not exist" && exit 1

if ! docker ps | grep -q "mongo-database"; then
    if docker run -d --name mongo-database -p 27017:27017 mongo; then
        echo "MongoDB started with docker"
    else
        echo "Error with running mongoDB" && exit 1
    fi
fi

npm run build

npm run start