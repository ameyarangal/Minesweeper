#!\bin\sh

docker kill minesweeper_ui || true
docker rm minesweeper_ui || true
docker rmi minesweeper_ui || true
docker build -t minesweeper_ui .
docker run -p 3000:3000 --name minesweeper_ui minesweeper_ui &