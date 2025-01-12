# FROM node:18.16.1-alpine3.18

# RUN mkdir -p /app
# WORKDIR /app

# RUN npm install nodemon -g

# EXPOSE 8080
# CMD echo 1; npm install; echo 2; npx nodemon app.js


# Use the Node official image
# https://hub.docker.com/_/node
FROM node:lts

# Create and change to the app directory.
WORKDIR /app

# Copy local code to the container image
COPY . ./

# Install packages
RUN npm ci

# Serve the app
CMD ["npm", "run", "start"]