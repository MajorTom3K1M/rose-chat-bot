# Use the official Node.js LTS version as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json ./

# Install app dependencies
RUN npm install --production

# If you are building your code for production
# RUN npm ci --only=production

# Copy the rest of your application's source code
COPY . .

# Expose the port your app runs on
EXPOSE 9000

# Define the command to run your app
CMD ["npm", "start"]
