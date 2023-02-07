# Use the official Node.js image from Docker Hub
FROM node:14-buster

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Run npm update in the container
RUN npm update

# Install the dependencies
RUN npm install


# Copy the rest of the code to the container
COPY . .

# Expose port 3000 for the Node server
EXPOSE 3000

# Specify the command to start the Node server
CMD [ "npm", "start" ]
