# syntax=docker/dockerfile:1

FROM node:lts AS build
WORKDIR /app
COPY package* ./
RUN npm ci
COPY src ./src
COPY index.html tsconfig.json vite.config.ts ./
RUN npm run build

FROM nginx:alpine
RUN chown -R nginx /etc/nginx; 
USER nginx:nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build app/dist /usr/share/nginx/html
# Re-using the ENTRYPOINT from the base nginx image
