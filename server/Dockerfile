From node:18-alpine AS Production

ENV NODE_ENV=Production
ENV PORT=3002
WORKDIR /var/www/src/api

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "sh","-c","npm run start" ]