FROM node:20

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./server/ ./

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]