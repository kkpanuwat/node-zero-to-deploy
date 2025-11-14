# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve build in production
FROM node:20-alpine
WORKDIR /app

# Copy build only
COPY --from=builder /app/build ./build

# Install static server
RUN npm install -g serve

EXPOSE 3001

# Serve the built site
CMD ["serve", "-s", "build", "-l", "3001"]
