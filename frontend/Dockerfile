
FROM node:14-alpine as builder

WORKDIR /usr/src

COPY . /usr/src

RUN yarn install --frozen-lockfile --silent
RUN yarn build

FROM node:14-alpine as production

COPY --from=builder /usr/src/.next /usr/src/.next 
COPY --from=builder /usr/src/.vercel /usr/src/.vercel 
COPY --from=builder /usr/src/package.json /usr/src/package.json 
COPY --from=builder /usr/src/yarn.lock /usr/src/yarn.lock
COPY --from=builder /usr/src /usr/src
COPY --from=builder usr/src/node_modules usr/src/node_modules

EXPOSE 3000

CMD ["yarn", "start"] 