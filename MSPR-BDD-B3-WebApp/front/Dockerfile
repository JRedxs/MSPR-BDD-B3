# Use the official Node.js image from Docker Hub
FROM node:19-buster

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Clear npm cache
RUN npm cache verify --force

# Install the dependencies
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Addition of the local environment
#RUN echo "REACT_APP_API_URL=http://localhost:8005" > .env.local
RUN echo "REACT_APP_API_URL=http://ec2-13-38-31-57.eu-west-3.compute.amazonaws.com:8005" > .env.local

# Expose port 3000 for the Node server
EXPOSE ${PORT}

# Specify the command to start the Node server
CMD [ "npm", "start" ]
