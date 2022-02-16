# syntax=docker/dockerfile:1
FROM node:14-alpine

ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .

RUN npm run build
CMD [ "node", "app.js" ]
