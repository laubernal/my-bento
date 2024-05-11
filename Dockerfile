# FROM node:20.12-alpine3.18 AS base

# ENV DIR /var/www
# WORKDIR $DIR

# FROM base as dev

# COPY . .
# EXPOSE $PORT
# CMD ["npm", "run", "start:dev"]

# ---------------------------------------------------------------

# FROM node:20.12-alpine3.18 AS base

# WORKDIR /app
# COPY ./server .
# RUN npm i
# RUN npm run build

# FROM node:20.12-alpine3.18 AS server

# WORKDIR /app
# RUN apk add tzdata
# RUN ln -s /usr/share/zoneinfo/Europe/Madrid /etc/localtime
# COPY --from=base /app/ ./server
# RUN rm -rf ./server/src
# EXPOSE 5000
# CMD ["node", "server/dist/src/main.js"]

# ---------------------------------------------------------------

FROM node:20.12-alpine3.18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server/tsconfig*.json ./

COPY ./server/mikro-orm.config.ts ./

COPY ./server/src ./src

RUN npm run build

CMD [ "npm", "run", "start:dev" ]