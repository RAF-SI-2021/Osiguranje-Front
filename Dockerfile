FROM node:14-alpine3.15 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY src ./src
COPY public ./public
COPY vite.config.js ./vite.config.js
COPY index.html ./

RUN npm install
RUN npm run build

COPY nginx ./nginx

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app /app
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN cd /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]