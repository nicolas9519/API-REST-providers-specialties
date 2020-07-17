#stage-1
FROM node:12 as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#stage-2
FROM node:12
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/app/dist ./dist
EXPOSE "${PORT}"
CMD node dist/server.js
