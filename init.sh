#!/bin/bash

set -e

[ ! -f ./.env ] && echo ".env does not exist" && exit 1

if ! docker ps | grep -q "mongo-database"; then
    if docker run -d --name mongo-database -p 27017:27017 mongo &>/dev/null; then
        echo "MongoDB started with docker"
    else
        ! docker start mongo-database \
            && echo "Error with running mongoDB" \
            && exit 1
        echo "MongoDB started with docker"
    fi
else
    echo "MongoDB is already started with docker"
fi

npm run build

npm run start