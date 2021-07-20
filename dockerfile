FROM node:12

WORKDIR /app/server

COPY /server/package*.json ./

RUN npm install --silent

COPY ./server ./

WORKDIR /app/client

COPY /client/package*.json ./

RUN npm install --silent

COPY ./client ./

WORKDIR /app/server

ENV PORT=3000

EXPOSE 3000

CMD ["node", "./index.js"]