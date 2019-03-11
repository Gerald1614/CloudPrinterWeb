FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]