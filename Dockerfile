FROM node:alpine

WORKDIR /usr/app

ENV NODE_ENV=prod

COPY package*.json ./
RUN npm i

COPY . .
EXPOSE 3000

CMD [ "npm", 'start' ]

