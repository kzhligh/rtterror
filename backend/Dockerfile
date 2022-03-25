FROM node:14-alpine as builder

WORKDIR /usr/src/api

COPY . .

RUN yarn install --frozen-lockfile --silent
RUN yarn build
RUN rm -rf node_modules && yarn install --frozen-lockfile --production --silent

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/api

COPY --from=builder /usr/src/api/package.json /usr/src/api/package.json 
COPY --from=builder /usr/src/api/.env /usr/src/api/.env
COPY --from=builder /usr/src/api/dist /usr/src/api/dist
COPY --from=builder /usr/src/api/node_modules /usr/src/api/node_modules

EXPOSE 5000

CMD [ "yarn", "start:prod" ] 