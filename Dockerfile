FROM node:11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

# RUN npm run initMockDb

CMD [ "npm", "run", "dev" ]
