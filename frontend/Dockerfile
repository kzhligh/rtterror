
FROM node:14-buster-slim

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . /usr/src

RUN yarn install --frozen-lockfile --silent

ENV NEXT_PUBLIC_HOST='host.docker.internal'

EXPOSE 3000

CMD ["yarn", "dev"] 