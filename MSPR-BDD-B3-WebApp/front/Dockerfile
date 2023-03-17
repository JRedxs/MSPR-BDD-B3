# Use the official Node.js image from Docker Hub
FROM node:14-buster

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install


# Copy the rest of the code to the container
COPY . .

# Addition of the local environment
RUN echo "REACT_APP_API_URL=http://localhost:8005" > .env.local

# Expose port 3000 for the Node server
EXPOSE ${EXPOSE_PORT}

# Specify the command to start the Node server

CMD [ "npm", "start" ]
