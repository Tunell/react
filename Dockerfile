FROM node:alpine
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080 3000 80

CMD [ "npm", "start" ]
