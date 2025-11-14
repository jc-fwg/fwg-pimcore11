npm-run-dev:
    cd application/; npm run dev

npm-run-watch:
    cd application/; npm run watch

ssh-uberspace:
    ssh uberfwgblogpimcore01 -t "cd /var/www/virtual/fwgblog && exec bash"

deploy-uberspace:
    export PATH="$HOME/.composer/vendor/bin:$PATH"; cd ./deployment; dep --file=uberspace.php deploy