#!\bin\sh

docker-compose up -d --build
docker image prune -a -f