# set base image
FROM node:16 AS base

# set working directory
WORKDIR /

# add files 
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
COPY stores ./stores
COPY .env ./.env

RUN npm install

# build and copy the public folder to the correct place
RUN npm run tsc
# ADD folder /path/inside/your/container
# make sure that public is one level above the compiled server code
# ADD ./public /dist/public

CMD npm run start
