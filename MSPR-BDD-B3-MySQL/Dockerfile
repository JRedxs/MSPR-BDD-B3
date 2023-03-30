# Use the official MySQL image from Docker Hub
FROM mysql:8.0-debian

# Set the environment variables for the MySQL database
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}

# Copy the initialization SQL script to the container
COPY Arosaje-db.sql /docker-entrypoint-initdb.d/


EXPOSE ${PORT}