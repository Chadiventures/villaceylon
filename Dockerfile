FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html rooms.html house.html ahangama.html surf.html things-to-do.html eat-drink.html day-trips.html getting-here.html faq.html booking.html /usr/share/nginx/html/
COPY styles.css main.js sitemap.xml robots.txt /usr/share/nginx/html/
COPY img /usr/share/nginx/html/img/

COPY hero.mp4 beach1.jpg rum1.jpg /assets/
COPY ["rum 2.jpg", "rum 3.jpg", "rum 4.jpg", "/assets/"]

RUN mkdir -p /usr/share/nginx/html/img/rooms \
  && cp /assets/hero.mp4 /usr/share/nginx/html/ \
  && cp /assets/beach1.jpg /usr/share/nginx/html/img/garden.jpg \
  && cp /assets/rum1.jpg /usr/share/nginx/html/img/rooms/lotus.jpg \
  && cp "/assets/rum 2.jpg" /usr/share/nginx/html/img/rooms/jade.jpg \
  && cp "/assets/rum 3.jpg" /usr/share/nginx/html/img/rooms/mist.jpg \
  && cp "/assets/rum 4.jpg" /usr/share/nginx/html/img/rooms/villa.jpg \
  && cp /assets/rum1.jpg /usr/share/nginx/html/img/rooms/palm.jpg \
  && cp "/assets/rum 2.jpg" /usr/share/nginx/html/img/rooms/reef.jpg \
  && cp "/assets/rum 3.jpg" /usr/share/nginx/html/img/rooms/pavilion.jpg \
  && rm -rf /assets

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
