FROM node:8

COPY . /app

WORKDIR /app/minesweeper

RUN npm install && \
 npm install --save react-scripts

EXPOSE 3000

CMD npm start