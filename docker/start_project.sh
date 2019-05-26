#!/bin/sh

echo 'Execute start_project.sh'

echo 'Disable apache2 vhost 000-default.conf'
if [ -f /etc/apache2/sites-enabled/000-default.conf ]; then
    a2dissite 000-default.conf
fi

echo 'Enable apache2 vhost'
if [ -f /opt/certs/cert.pem ]; then
    a2ensite https-twitzer-timeline.conf
else
    a2ensite http-twitzer-timeline.conf
fi

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
cd /var/www/html && ./vendor/bin/bfwAddMod -a
cd /var/www/html && ./vendor/bin/bfwEnMod -a

echo 'Fenom : Create compiled directory'
mkdir -p /tmp/fenom-compile
chmod +w /tmp/fenom-compile
chown www-data:www-data /tmp/fenom-compile

echo 'Cache : Update permissions'
chmod -R +w /var/www/html/app/cache
chown -R www-data:www-data /var/www/html/app/cache

echo 'Run gulp'
cd /var/www/html && ./node_modules/.bin/gulp

# apache2-foreground will kept the container live, and run like infinite loop
# so need to always be at the end because nothing will be execute after that
echo 'Execute apache2-foreground'
apache2-foreground
