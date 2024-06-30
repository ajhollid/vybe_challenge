
#!/bin/bash

# Change directory to root Server directory for correct Docker Context
cd ..
client="./docker/client.Dockerfile"
redis="./docker/redis.Dockerfile"
server="./docker/server.Dockerfile"
docker build -f $client -t vybe_client .
docker build -f $redis -t vybe_redis .
docker build -f $server -t vybe_server .