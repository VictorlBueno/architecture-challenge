FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./

RUN npm install --omit=dev
RUN npm run prisma:migrate
RUN npm run prisma:migrate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]