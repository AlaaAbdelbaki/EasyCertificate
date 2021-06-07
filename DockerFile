FROM node:latest

WORKDIR /app

COPY . .

EXPOSE 3000
EXPOSE 5000

CMD [ "/bin/sh" , "-c" , "npm install -g nodemon && npm install -g truffle && npm uninstall bcrypt && npm install bcrypt && npm uninstall node-sass && npm install node-sass && npm run dev" ]
