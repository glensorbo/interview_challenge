FROM node:16-alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /usr/app
COPY package* ./
RUN npm install --production
COPY ./.env ./
COPY --from=builder ./usr/app/build ./build
EXPOSE 5000
CMD ["npm", "start"]