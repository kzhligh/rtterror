FROM node:14-alpine as builder

WORKDIR /usr/src/api

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --frozen-lockfile --silent

COPY . .

RUN yarn build

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/api

COPY --from=builder /usr/src/api/package.json /usr/src/api/package.json 
COPY --from=builder /usr/src/api/yarn.lock /usr/src/api/yarn.lock
COPY --from=builder /usr/src/api/dist /usr/src/api/dist
COPY --from=builder /usr/src/api/.env /usr/src/api/.env

RUN yarn install --frozen-lockfile --silent

EXPOSE 5000

CMD [ "yarn", "start:prod" ] 