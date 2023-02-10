# Use an official Python runtime as the base image
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt ./

# Update pip in the container
RUN python -m pip install --upgrade pip

# Install the project dependencies in the container
RUN pip install -r requirements.txt

# Copy the rest of the project files to the container
COPY . .

# Expose port 8000 in the container
EXPOSE 8000

# Specify the command to run the app when the container is started

