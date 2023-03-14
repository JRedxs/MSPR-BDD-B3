# Use the official MySQL image from Docker Hub
FROM mysql:8.0-debian

# Set the environment variables for the MySQL database
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=Arosaje-db
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin
ENV MYSQL_CHARSET=utf8mb4
ENV MYSQL_COLLATION=utf8mb4_general_ci

# Copy the initialization SQL script to the container
COPY Arosaje-db.sql /docker-entrypoint-initdb.d/

EXPOSE 3306