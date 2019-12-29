FROM node

WORKDIR /root

COPY package.json .

RUN yarn global add @angular/cli && yarn

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]
