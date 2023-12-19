# FROM node:16 AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# CMD ["npm", "run", "start"]

# FROM node:17.1-alpine as build
# WORKDIR /app
# COPY . .
# # COPY package*.json ./
# RUN npm install

# RUN npm run build

# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# # COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# EXPOSE 3001
# CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine

WORKDIR /app

# COPY . /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install


CMD ["npm", "start"]

EXPOSE 3000
# COPY package*.json ./
# RUN npm install

# COPY . .

# CMD ["npm", "run", "start"]