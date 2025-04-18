USER := $(shell echo $$USER)

uberspace-quota:
	echo "Fetching Uberspace quota usages:"
	du -hs /var/www/virtual/$(USER)/awm-pimcore11/releases /var/www/virtual/$(USER)/awm-pimcore11/shared/var/log /var/www/virtual/$(USER)/awm-pimcore11/shared/var/versions /var/www/virtual/$(USER)/awm-pimcore11/shared/var/recyclebin /tmp /var/tmp /var/lib/php-sessions/$(USER) 2> /dev/null