#!/bin/bash
VERSION="0.0.1"
NAME="log-service"
docker build -t $NAME:$VERSION .
docker tag $NAME:$VERSION nenadfilipovic/$NAME:$VERSION
docker push nenadfilipovic/$NAME:$VERSION