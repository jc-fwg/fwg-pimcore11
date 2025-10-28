FROM pimcore/pimcore:php8.3-debug-latest

# Install mysql-client
RUN apt-get update && apt-get install -y default-mysql-client curl \
    && if ! command -v just >/dev/null 2>&1; then \
         curl -fsSL https://just.systems/install.sh | bash -s -- --to /usr/local/bin; \
       fi

# Copy the application code
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html