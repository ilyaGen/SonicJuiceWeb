FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run client:install

RUN npm run client:build

EXPOSE 5000

ENV ENVIRONMENT=production

CMD ["npm", "run", "start"]