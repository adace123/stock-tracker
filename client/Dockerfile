FROM node:10-alpine

WORKDIR /root

COPY package*.json ./

RUN npm install && apk update && apk add bash

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]
