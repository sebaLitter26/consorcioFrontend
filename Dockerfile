ARG env=prod

## Stage 1: Build ##

FROM node:14.20-alpine3.15 as build

ARG env

WORKDIR /app

## Configuro proxy
RUN npm config set proxy http://proxycentral:8080
RUN npm config set https-proxy http://proxycentral:8080

## Descargo e instalo dependencias con clean install
COPY package.json package-lock.json /app/
RUN npm ci --verbose

## Copio el código fuente
COPY . /app

## Genero bundle
RUN npm run $env


## Stage 2: Setup NGINX ##

FROM nginx:1.19.4-alpine as setup

ARG env

## Copio mi configuración de NGINX
COPY ./nginx.conf /etc/nginx/nginx.conf

## Borro el sitio por default de NGINX
RUN rm -rf /usr/share/nginx/html/*

## Copio los bundles a la carpeta pública de NGINX
COPY --from=build /app/$env /usr/share/nginx/html

## Abro puertos 80 y 443 del container
EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]