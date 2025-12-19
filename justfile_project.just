ssh-uberspace:
    ssh uberfwgblogpimcore01 -t "cd /var/www/virtual/fwgblog && exec bash"

deploy-uberspace:
    export PATH="$HOME/.composer/vendor/bin:$PATH"; cd ./deployment; dep --file=uberspace.php deploy

deploy-unlock:
    export PATH="$HOME/.composer/vendor/bin:$PATH"; cd ./deployment; dep --file=uberspace.php deploy:unlock
