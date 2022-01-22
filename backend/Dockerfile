FROM node:14-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD [ "node", "app.js" ] 