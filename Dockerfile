# Development Dockerfile for Frontend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@21

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 4200

# Run Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
