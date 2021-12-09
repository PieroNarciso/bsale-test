FROM node:14.18-alpine3.12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 8080
CMD npm run dev
