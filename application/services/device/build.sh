#!/bin/bash
VERSION="latest"
NAME="device-service"
docker build -t $NAME:$VERSION .
docker tag $NAME:$VERSION nenadfilipovic/$NAME:$VERSION
docker push nenadfilipovic/$NAME:$VERSION