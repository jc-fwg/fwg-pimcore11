npm-run-dev:
    cd application/; npm run dev

ssh-uberspace:
    ssh uberawmediapimcore01

deploy-uberspace:
    export PATH="$HOME/.composer/vendor/bin:$PATH"; cd ./deployment; dep --file=uberspace.php deploy