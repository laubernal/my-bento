FROM node:20.12-alpine3.18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server/tsconfig*.json ./

COPY ./server/mikro-orm.config.ts ./

COPY ./server/node-pg-migrate-config.json ./

COPY ./server/src ./src

COPY ./server/PostgreSql/migrations ./pg-migrations

RUN npm run build

CMD [ "npm", "run", "start:dev" ]