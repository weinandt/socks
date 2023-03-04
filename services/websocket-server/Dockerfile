######### BUILDER
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build


####### Production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY schema.graphql ./

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist/ ./src

EXPOSE 8080
ENTRYPOINT [ "node", "src/server.js" ]