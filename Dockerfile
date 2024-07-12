# Use the official Node.js image as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port the app runs on
#EXPOSE 5173

# Command to run your app
CMD ["npm", "run", "build"]