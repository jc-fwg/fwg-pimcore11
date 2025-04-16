# BBX Pimcore Template
Platform Version: 2024.4
Pimcore Version: ^11.5.4

## Table of Contents

- [Pre Requisites](#pre-requisites)
- [Github Origin und Upstream konfigurieren](#github-origin-und-upstream-konfigurieren)
  - [Upstream Pull](#upstream-pull)
- [Projekt vorbereiten](#projekt-vorbereiten)
  - [.env](#env)
  - [.env.prod.local](#envprodlocal)
  - [Anpassungen in application/config/config.yaml](#anpassungen-in-applicationconfigconfigyaml)
- [Docker Setup](#docker-setup)
- [Pimcore Installation](#pimcore-installation)
- [Login](#login)
- [Projekt Justfile](#projekt-justfile)
- [Uberspace Deployment](#uberspace-deployment)
- [Repository Upstream Setup und Usage](#repository-upstream-setup-und-usage)
  - [Upstream setzen](#upstream-setzen)
  - [Fetch und Pull](#fetch-und-pull)

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

### Github Origin und Upstream konfigurieren
- Origin setzen auf eigenes Repository: ```git remote add origin https://github.com/your/repository.git```
- Upstream setzen: ```git remote add upstream git@github.com:jc-fwg/pimcore-bbx-template.git```

### Upstream Pull
```just git-pull-upstream```

## Projekt vorbereiten

### .env
- COMPOSE_PROJECT_NAME in .env.dist anpassen
- ```cp .env.dist .env```

### .env.prod.local
Wird für Prod Deployment benutzt und muss entsprechend angepasst werden

### Anpassungen in application/config/config.yaml 
Folgende Anpassungen sind notwendig bzw zu überprüfen:
- ```pimcore.email.sender.name```
- ```pimcore.email.sender.email```
- ```pimcore.mailer.transports.main```
- ```pimcore.pimcore_uuid.instance_identifier```

## Docker Setup
- ```just start``` zieht Images und startet Container

## Pimcore Installation
Die Installation von Pimcore kann ganz einfach gestartet werden:
```just pim-install```

Folgende Bundles werden dabei schon mit installiert:

- PimcoreAdminBundle
- PimcoreApplicationLoggerBundle
- PimcoreQuillBundle
- PimcoreSimpleBackendSearchBundle
- PimcoreUuidBundle
- BackupBundle (blackbit)

Schritte durchlaufen und dann sollte es passen

## Login
http://localhost/let-me-in

- User: admin
- Pass: admin

## Projekt Justfile
Eigene Justfile Entries können in der ```project.just``` implementiert werden. 
Diese werden dann via ```justfile``` importiert.

Das bestehende SSH Command kann bzw sollte angepasst werden

## Uberspace Deployment
- Daten in `deployment/uberspace.php` anpassen

```just deploy-uberspace``` zum Deployen

## Repository Upstream Setup und Usage

### Upstream setzen
- ```git remote add upstream git@github.com:jc-fwg/pimcore-bbx-template.git```

### Fetch und Pull
- ```git fetch upstream```
- ```git merge upstream/main --allow-unrelated-histories```
