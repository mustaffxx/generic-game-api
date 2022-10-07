FROM node:16.17.0
WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .
