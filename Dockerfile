FROM bitnami/node:latest

WORKDIR /var/www/html

COPY ./app ./

RUN npm install

CMD ["npm", "start"]