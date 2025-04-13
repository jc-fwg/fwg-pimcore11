FROM pimcore/pimcore:php8.3-debug-latest

# Install mysql-client
RUN apt-get update && apt-get install -y default-mysql-client curl \
    && curl -fsSL https://just.systems/install.sh | bash -s -- --to /usr/local/bin

# Copy the application code
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html