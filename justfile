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
    #docker compose exec php vendor/bin/pimcore-install --mysql-host-socket=db --mysql-username=pimcore --mysql-password=pimcore --mysql-database=pimcore

