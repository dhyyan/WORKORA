# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Expose port (adjust if your backend uses a different port)
EXPOSE 3560

# Start the application
CMD ["npm", "start"]
