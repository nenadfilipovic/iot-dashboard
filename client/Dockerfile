FROM node:14.12.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.19.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf:ro
COPY --from=build-stage /app/build/ /usr/share/nginx/html