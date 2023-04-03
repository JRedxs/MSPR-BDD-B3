# Use the official MySQL image from Docker Hub
FROM mysql:8.0-debian

# Set the environment variables for the MySQL database
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=Arosaje_db
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

# Copy the initialization SQL script to the container
COPY Arosaje-db.sql /docker-entrypoint-initdb.d/


EXPOSE ${PORT}