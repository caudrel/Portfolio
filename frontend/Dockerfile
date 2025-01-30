FROM node:20.9.0-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json tsconfig.json

COPY public public

COPY src src

CMD npm run dev