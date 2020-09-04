#!/bin/bash
VERSION="0.0.1"
NAME="mqtt-service"
docker build -t $NAME:$VERSION .
docker tag $NAME:$VERSION nenadfilipovic/$NAME:$VERSION
docker push nenadfilipovic/$NAME:$VERSION