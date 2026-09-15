FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html zuri-hotel.html /usr/share/nginx/html/
COPY beach1.jpg couple.jpg rum1.jpg hero.mp4 /usr/share/nginx/html/
COPY "rum 2.jpg" "rum 3.jpg" "rum 4.jpg" /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
