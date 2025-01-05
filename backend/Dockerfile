# Use an official PHP image with Apache
FROM php:8.1-apache

# Install necessary extensions
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-install pdo_mysql

# Set the working directory
WORKDIR /var/www/html

# Copy all files into the document root
COPY . /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Expose HTTP port
EXPOSE 80