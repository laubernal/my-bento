FROM node:20.12-alpine3.18

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server/tsconfig*.json ./
COPY ./server/tsconfig.migrations.json ./

COPY ./server/mikro-orm.config.ts ./

COPY ./server/node-pg-migrate-config.json ./

COPY ./server/src ./src

COPY ./server/PostgreSql/migrations ./pg-migrations

RUN npm run build

RUN npx tsc -p tsconfig.migrations.json

#RUN rm -f /app/dist/pg-migrations/*.d.ts
#RUN rm -f /app/dist/pg-migrations/*.ts
#RUN rm -f /app/dist/pg-migrations/*.map

#RUN mkdir -p /app/dist/pg-migrations && \
#    cp -r /app/pg-migrations/* /app/dist/pg-migrations/

CMD [ "npm", "run", "start:dev" ]