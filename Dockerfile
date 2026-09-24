FROM python:3.12-alpine AS builder

WORKDIR /src
COPY build.py styles.css main.js ./
COPY hero.mp4 beach1.jpg rum1.jpg ./
COPY ["rum 2.jpg", "rum 3.jpg", "rum 4.jpg", "./"]
RUN python3 build.py

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
