# 
# @file Dockerfile
# @description Dockerfile for the Teacher Empowerment frontend application.
# @version 1.0.0
# @date 2025-01-09
# authors 
#   - Edward Alvin
#   - Stephanie Staniswinata
# 
# @details
# This Dockerfile sets up a Docker container for the Teacher Empowerment frontend application.
# It uses a Node.js base image, installs dependencies, copies the application code, and starts the application.
#

FROM node:18.16.1-alpine3.18

RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 3000

CMD ["npm", "start"]