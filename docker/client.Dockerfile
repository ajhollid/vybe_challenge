FROM node:20

WORKDIR /app

COPY ./client/package*.json ./

RUN npm install

COPY ./client .

RUN npm run test

RUN npm run build

RUN npm install -g serve

CMD ["serve","-s", "dist", "-l", "5173"]

EXPOSE 5000
