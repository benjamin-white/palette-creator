# syntax=docker/dockerfile:1

FROM node:lts-alpine
WORKDIR /app
# Copy the dependencies first to improve layer caching
COPY package.json .
RUN npm i
COPY . .
# EXPOSE 3000
# CMD ["node", "src/index.js"]
CMD ["npm run build"]

# FROM node:18-alpine3.17 as build

# WORKDIR /app
# COPY . /app

# RUN npm install
# RUN npm run build

# FROM ubuntu
# RUN apt-get update
# RUN apt-get install nginx -y
# COPY --from=build /app/dist /var/www/html/
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

##########################################

# FROM node:20-alpine AS build-stage
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build

# FROM busybox:1.35
# RUN adduser -D static
# USER static
# WORKDIR /home/static
# COPY --from=build-stage /app/dist .
# CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]