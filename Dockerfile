FROM node:11

WORKDIR /usr/src/app

# COPY package*.json ./
# COPY webpack.config.*.js ./

# RUN npm install

# RUN npm run build:prod

COPY /dist .

EXPOSE 9000

# RUN npm run initMockDb

# CMD [ "npm", "run", "build:prod" ]
CMD [ "node", "server.js" ]
