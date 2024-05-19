# Use the official Node.js 16 image as a parent image
FROM node:16-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) files into the working directory
COPY package*.json ./

# Install dependencies including 'devDependencies' for building the TypeScript
RUN npm install

# Copy the rest of your application's source code from your host to your image's filesystem.
COPY . .

# Use TypeScript Compiler to build the project - this assumes you have a tsconfig.json
RUN npm run build

# Your application's default port, you might need to adjust if different
EXPOSE 8080

# Command to run the app using the compiled JavaScript
CMD npm run dev





