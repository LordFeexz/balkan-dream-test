FROM node:21.6.0-alpine3.18

WORKDIR /usr/local/app

COPY package.json package-lock.json /usr/local/app/

RUN npm install && npm cache clean --force

RUN npm install pm2 typescript -g

COPY ./ /usr/local/app/

RUN npm run build

EXPOSE 3001

CMD [ "pm2-runtime","start","ecosystem.config.js" ]