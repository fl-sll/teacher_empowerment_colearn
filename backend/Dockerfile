# 
# @file dockerfile
# @description Dockerfile for the Teacher Empowerment backend application.
# @version 1.0.0
# @date 2025-01-12
# authors 
#   - Edward Alvin
#   - Stephanie Staniswinata
# 
# @details
# This Dockerfile sets up a Docker container for the Teacher Empowerment backend application.
# It uses a Node.js base image, installs dependencies, copies the application code, and starts the application.
#

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