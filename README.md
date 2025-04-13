# Pimcore BBX Template

## Table of Contents

- [Pre Requisites](#pre-requisites)
- [Docker Setup](#docker-setup)
- [Pimcore Installation](#pimcore-installation)
- [Login](#login)

## Pre Requisites
Benötigt wird lokal
- just
- composer
- PHP 8.3

Ggf kommt mit Composer ein PHP 8.4.x mit. in diesem Fall:

- ```brew install php@8.3```
- ```brew unlink php@8.4```
- ```brew link php@8.3```

Durch ein ```php -v``` testen, ob die PHP Version nun eine 8.3 ist. Danach:

- ```composer install```

und ggf auftretende Issues auflösen.

## Docker Setup

- ```just du``` zieht Images und startet Container

## Pimcore Installation

```docker compose exec php vendor/bin/pimcore-install --mysql-host-socket=db --mysql-username=pimcore --mysql-password=pimcore --mysql-database=pimcore```

Schritte durchlaufen und dann sollte es passen

## Login
http://localhost/let-me-in 

## Repository Upstream Setup und Usage
### Upstream setzen
- ```git remote add upstream git@github.com:jc-fwg/pimcore-bbx-template.git```
### Fetch und Pull
- ```git fetch upstream```
- ```git merge upstream/main --allow-unrelated-histories```
