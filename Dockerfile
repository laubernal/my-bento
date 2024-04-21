FROM node:20.12-alpine3.18 AS backend

WORKDIR /app
COPY ./server .
RUN npm i
RUN npm run build

FROM node:20.12-alpine3.18 AS server

WORKDIR /app
RUN apk add tzdata
RUN ln -s /usr/share/zoneinfo/Europe/Madrid /etc/localtime
COPY --from=backend /app/ ./server
RUN rm -rf ./server/src
EXPOSE 5000
CMD ["node", "server/dist/src/main.js"]