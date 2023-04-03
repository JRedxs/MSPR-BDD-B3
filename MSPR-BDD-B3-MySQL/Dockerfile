# Use the official MySQL image from Docker Hub
FROM mysql:8.0-debian

# Set the environment variables for the MySQL database
ENV MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD}
ENV MYSQL_DATABASE=${DATABASE}
ENV MYSQL_USER=${USER}
ENV MYSQL_PASSWORD=${PASSWORD}

# Copy the initialization SQL script to the container
COPY Arosaje-db.sql /docker-entrypoint-initdb.d/


EXPOSE ${PORT}