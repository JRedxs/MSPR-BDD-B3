# Use the official MySQL image from Docker Hub
FROM mysql:8.0-debian

# Set the environment variables for the MySQL database
ENV MYSQL_ROOT_PASSWORD=admin
ENV MYSQL_DATABASE=Arosaje-db
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin

# Copy the initialization SQL script to the container
COPY Arosaje-db.sql /docker-entrypoint-initdb.d/

# Set character set and collation server options for MySQL
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]

EXPOSE 3306