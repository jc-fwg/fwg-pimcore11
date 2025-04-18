# BBX Pimcore Template
Platform Version: 2024.4
Pimcore Version: ^11.5.4

## Table of Contents

- [Pre Requisites](#pre-requisites)
  - [Homebrew und weitere Tools](#homebrew-und-weitere-tools)
  - [PHP 8.3.x](#php-83x)
- [Github Prerequisites, Template Cloning, Upstream Setup](#github-prerequisites-template-cloning-upstream-setup)
  - [Eigenes Projekt Repository anlegen](#eigenes-projekt-repository-anlegen)
  - [Lokales Verzeichnis und BBX Template clonen](#lokales-verzeichnis-und-bbx-template-clonen)
  - [Git Clone per SSH](#git-clone-per-ssh)
  - [Origin auf euer Repository setzen](#origin-auf-euer-repository-setzen)
  - [Git initial setzen und pushen](#git-initial-setzen-und-pushen)
  - [Upstream Setup und Handling](#upstream-setup-und-handling)
  - [Upstream Fetch und Pull](#upstream-fetch-und-pull)
- [Git Clone per SSH](#git-clone-per-ssh)
- [Projekt vorbereiten](#projekt-vorbereiten)
  - [.env aus .dist erstellen](#env-aus-dist-erstellen)
  - [Project Name setzen](#project-name-setzen)
  - [.env.prod.local](#envprodlocal)
  - [Anpassungen in application/config/config.yaml](#anpassungen-in-applicationconfigconfigyaml)
- [Docker Handling](#docker-handling)
- [Pimcore Installation](#pimcore-installation)
- [Login](#login)
- [Projekt Justfile](#projekt-justfile)
- [Uberspace Deployment](#uberspace-deployment)
- [Repository Upstream Setup und Usage](#repository-upstream-setup-und-usage)
  - [Upstream setzen](#upstream-setzen)
  - [Fetch und Pull](#fetch-und-pull)

## Pre Requisites

### Homebrew und weitere Tools
Lokal werden einige Sachen benötigt. Ich empfehle die Installation via Homebrew:
https://brew.sh/

- just -> ```brew install just```
- composer -> ```brew install composer```
- Git -> ```brew install git```
- PHP 8.3

### PHP 8.3.x
Ggf kommt mit Composer ein PHP 8.4.x mit. Daher erst mal die PHP Version testen:
```php -v```

Sollte PHP 8.3 nun noch benötigt werden, dann muss die Version umgeschaltet werden.
- ```brew install php@8.3```
- ```brew unlink php@8.4``` (oder ggf angepasste Version)
- ```brew link php@8.3```

Durch ein ```php -v``` testen, ob die PHP Version nun eine 8.3 ist. Danach:
- ```composer install```

und ggf auftretende Issues auflösen.


## Github Prerequisites, Template Cloning, Upstream Setup

### Eigenes Projekt Repository anlegen
An dieser Stelle macht es Sinn, dass ihr euer eigenes Repository auf Github anlegt.
Nein, es muss nicht zwingend Github sein. Aber ich beziehe mich darauf, weil ich damit arbeite. ;)

### Lokales Verzeichnis und BBX Template clonen
Ihr braucht Rechte auf dem Repository und euer Public SSH Key muss hinterlegt sein. 
Wenn das alles erledigt ist, muss das Repository per SSH geclont werden.

Am besten lokal ein Verzeichnis anlegen in der Art
```/Users/yourname/projects/your-project```

### Git Clone per SSH
Innerhalb dieses Verzeichnisses dann Git Clone ausführen
```git clone git@github.com:jc-fwg/pimcore-bbx-template.git```

Das dadurch angelegte Verzeichnis könnt ihr nach belieben umbenennen.
```mv pimcore-bbx-template your-name```

### Origin auf euer Repository setzen
Wichtig! Setzt euren Remote auf SSH, sonst werdet ihr immer wieder nach User und Passwort gefragt.

- ```git remote remove origin```
- ```git remote add origin git@github.com:your/project.git```
- ```git remote -v``` um zu prüfen, dass der Origin korrekt gesetzt wurde

### Git initial setzen und pushen
- ```rm -rf .git```
- ```git init```
- ```git add .```
- ```git commit -m "Initial commit"```
- ```git remote add origin git@github.com:your/project.git```
- ```git push -u origin main```

Es kann sein, dass die Github Oush Protection anschlägt aufgrund des Google API Private Key Examples.
Was ihr an Optionen habt steht in der Meldung mit drin. Entscheidet selbst, wie ihr damit umgeht :)

### Upstream Setup und Handling
Das BBX Template wird per Git als Upstream Repository behandelt.
Somit könnt ihr immer die neuesten Änderungen vom Template ziehen und in euer Repository übernehmen.

Upstream setzen: ```git remote add upstream git@github.com:jc-fwg/pimcore-bbx-template.git```

### Upstream Fetch und Pull
Um die neuesten Änderungen vom Upstream zu ziehen, nutzt ihr einfach just.
```just git-pull-upstream```


## Pimcore vorbereiten

### .env aus .dist erstellen
- ```cp .env.dist .env```

### Project Name setzen
Der Project Name wird in der .env gesetzt und ist wichtig für die Docker Container Names.

- COMPOSE_PROJECT_NAME in .env.dist anpassen

### .env.prod.local
Wird für Prod Deployment benutzt und muss entsprechend angepasst werden

### Anpassungen in application/config/config.yaml 
Folgende Anpassungen sind notwendig bzw zu überprüfen:
- ```pimcore.email.sender.name```
- ```pimcore.email.sender.email```
- ```pimcore.mailer.transports.main```
- ```pimcore.pimcore_uuid.instance_identifier```


## Docker Handling
- ```just start``` zieht ggf Images und startet Container
- ```just stop``` stoppt Container
- ```just restart``` startet Container neu


## Pimcore Installation
Die Installation von Pimcore kann ganz einfach außerhalb des Containers gestartet werden:
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
