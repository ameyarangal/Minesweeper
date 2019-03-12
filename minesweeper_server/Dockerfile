FROM node:8

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3010

RUN chmod 777 run-nodeservice.sh

ENTRYPOINT ["sh","run-nodeservice.sh"]