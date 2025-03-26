FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm run prisma:migrate
RUN npm run prisma:generate

RUN npm run build

EXPOSE 3000

CMD ["npm run start:prod"]
