FROM node:20.18.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g knex

RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x /usr/local/bin/wait-for-it

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "wait-for-it mysql-container:3306 -- knex migrate:latest --env production && npm start"]
