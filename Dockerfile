# Stage 1: Build the Frontend
FROM node:18.16.1-alpine3.18 as frontend

WORKDIR /frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# Stage 2: Prepare the Backend
FROM node:18.16.1-alpine3.18 as backend

WORKDIR /backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
COPY ./backend ./
RUN npm install nodemon -g

# Stage 3: Nginx for Frontend and Backend
FROM nginx:1.25.1-alpine3.17 as nginx

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files to Nginx's web root
COPY --from=frontend /frontend/build /usr/share/nginx/html
# Expose the ports
EXPOSE 80
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]