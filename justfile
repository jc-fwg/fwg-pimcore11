import 'project.just'

set dotenv-filename := "application/.env"

list:
    just --list

start:
    cd ./application; docker compose up -d

stop:
    cd ./application; docker compose down

restart:
    just stop
    just start

shell:
    @docker exec -it $COMPOSE_PROJECT_NAME-php-1 /bin/bash

cache-clear: shell
    bin/console cache:clear; bin/console pimcore:cache:clear

git-pull-upstream:
    git fetch upstream; git merge upstream/main --allow-unrelated-histories

pim-install:
    docker compose exec php vendor/bin/pimcore-install \
    --mysql-host-socket=db \
    --mysql-host-socket=$DATABASE_HOST \
    --mysql-username=$DATABASE_USER \
    --mysql-password=$DATABASE_PASSWORD \
    --mysql-database=$DATABASE_NAME \
    --admin-username=$PIMCORE_INSTALL_ADMIN_USERNAME \
    --admin-password=$PIMCORE_INSTALL_ADMIN_PASSWORD \
    --no-interaction && \
    docker compose exec php bin/console pimcore:bundle:install PimcoreAdminBundle && \
    docker compose exec php bin/console pimcore:bundle:install PimcoreApplicationLoggerBundle && \
    docker compose exec php bin/console pimcore:bundle:install PimcoreSimpleBackendSearchBundle && \
    docker compose exec php bin/console pimcore:bundle:install PimcoreUuidBundle

# Remove all volumes
remove-volumes:
  cd ./application; docker compose down --volumes

