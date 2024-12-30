FROM node:18.16.1-alpine3.18

RUN mkdir -p /app
WORKDIR /app

RUN npm install nodemon -g

EXPOSE 8080
CMD echo 1; npm install; echo 2; npx nodemon app.js