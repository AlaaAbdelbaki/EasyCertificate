FROM node:latest

WORKDIR /app

COPY . .

RUN apt update

RUN npm install -g truffle

RUN npm install

WORKDIR /app/client/

RUN npm install

WORKDIR /app

EXPOSE 3000

EXPOSE 5000

CMD [ "/bin/sh" , "-c" , "npm run dev" ]
