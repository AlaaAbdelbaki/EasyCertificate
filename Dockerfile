FROM node:latest

WORKDIR /app

COPY . .

RUN apt update 

RUN apt install vim

RUN apt install build-essentials

RUN npm install node-gyp

RUN npm install

RUN cd /app/client/

RUN npm install

RUN cd /app

RUN npm install -g truffle

EXPOSE 3000
EXPOSE 5000


CMD [ "/bin/sh" , "-c" , "npm run dev" ]
