# exit when any command fails
set -e

cd services/connection-api
docker build -t connection-api .
kind load docker-image connection-api

cd ../websocket-server
docker build -t websocket-server .
kind load docker-image websocket-server

kubectl rollout restart deployment