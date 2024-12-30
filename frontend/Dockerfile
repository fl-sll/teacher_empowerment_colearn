FROM node:18.16.1-alpine3.18

RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

ARG ENV_FILE=.env
COPY ${ENV_FILE} /app/.env

EXPOSE 3000

CMD ["npm", "start"]