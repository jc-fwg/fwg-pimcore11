import 'project.just'

set dotenv-filename := "application/.env"

alias du := docker-start
alias dd := docker-down
alias dr := docker-restart

list:
    just --list

docker-start:
    cd ./application; docker compose up -d

docker-down:
    cd ./application; docker compose down

docker-restart:
    just docker-down
    just docker-start

shell:
    @docker exec -it $COMPOSE_PROJECT_NAME-php-1 /bin/bash

cache-clear: shell
    bin/console cache:clear; bin/console pimcore:cache:clear



pim-install:
    #docker compose exec php vendor/bin/pimcore-install --mysql-host-socket=db --mysql-username=pimcore --mysql-password=pimcore --mysql-database=pimcore

