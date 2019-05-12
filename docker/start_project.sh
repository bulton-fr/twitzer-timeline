#!/bin/sh

echo 'Execute start_project.sh'

echo -n 'Disable apache2 vhost 000-default.conf ... '
if [ -f /etc/apache2/sites-enabled/000-default.conf ]; then
    sudo a2dissite 000-default.conf
fi
echo 'Done'

echo 'Execute composer'
if [ -d /var/www/html/vendor ]; then
    composer update
else
    composer install
fi

echo 'Execute npm'
if [ -d /var/www/html/node_modules ]; then
    npm update
else
    npm install
fi

echo 'BFW : Install all modules'
cd /var/www/html && sudo ./vendor/bin/bfwInstallModules

echo 'Fenom : Create compiled directory'
sudo mkdir -p /tmp/fenom-compile
sudo chmod +w /tmp/fenom-compile
sudo chown www-data:www-data /tmp/fenom-compile

echo 'Cache : Update permissions'
sudo chmod -R +w /var/www/html/app/cache
sudo chown -R www-data:www-data /var/www/html/app/cache

echo 'Run gulp'
cd /var/www/html && sudo ./node_modules/.bin/gulp

# apache2-foreground will kept the container live, and run like infinite loop
# so need to always be at the end because nothing will be execute after that
echo 'Execute apache2-foreground'
sudo apache2-foreground
