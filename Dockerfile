FROM node:latest

WORKDIR /app

COPY . .

EXPOSE 3000
EXPOSE 5000

CMD [ "/bin/sh" , "-c" , "cd /app/client && npm install -g nodemon && npm install --force && npm update --force && npm start && cd /app/client/backend && nodemon server" ]