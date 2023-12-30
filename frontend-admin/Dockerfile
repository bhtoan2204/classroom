# Use a specific Node.js version
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /usr/app

# Copy only the package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the final image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/package*.json ./

# Install production dependencies only
RUN npm install --production

# Switch to a non-root user
USER node

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
