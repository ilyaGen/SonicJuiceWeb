FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run client:install

RUN npm run client:build

CMD ["npm", "run", "start"]