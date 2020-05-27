#!/bin/bash

echo "Идёт установка, пожалуйста, подождите.."

# Установка необходимых библиотек и приложений
apt-get update
apt-get install libpcre-devel libssl-devel perl-devel zlib-devel libkrb5-devel libGeoIP-devel libgd2-devel libpam-devel libxml2-devel libxslt-devel apache2-htpasswd quota node npm

apt-get install nginx

# Включаем квотирование
sed -i '1i/dev/sda/     /     ext4     defaults,usrquota,grpquota     0 0' /etc/fstab
mount -o remount /
quotacheck -favugm
quotaon -avug

# Создание необходимых каталогов
mkdir /var/www
mkdir /var/www/nginx
cp nginx/index.html /var/www/nginx/
chown _nginx /var/www/nginx/
chmod -R 700 /var/www/nginx/
cp -R azdav /var/www/
chown _nginx /var/www/azdav/
chmod -R 700 /var/www/azdav/

# Настройка файлов с паролями
touch /etc/nginx/webdav.password
touch /etc/nginx/admin.password
chown _nginx /etc/nginx/admin.password
chmod 700 /etc/nginx/admin.password
chown _nginx /etc/nginx/webdav.password
chmod 700 /etc/nginx/webdav.password

# Настройка директории общего доступа по webdav
mkdir /srv/webdav
chown _nginx /srv/webdav/
chmod -R 700 /srv/webdav/

# Настройка конфигурации nginx
cp nginx/nginx.conf /etc/nginx/
chown _nginx /etc/nginx/
chmod -R 700 /etc/nginx/
cp nginx/default.conf /etc/nginx/sites-available.d/
chown _nginx /etc/nginx/sites-available.d/
chmod -R 700 /etc/nginx/sites-available.d/

# Создаём учётную запись администратора
while [ -z $adminLogin ]
do
echo -n "Введите логин администратора: "
read adminLogin
done

while [ -z $adminPass ]
do
echo -n "Введите пароль администратора: "
read adminPass
done

echo $adminPass | htpasswd -i /etc/nginx/admin.password $adminLogin

# Указываем путь до домашнего каталога пользователя
while [ -z $userPath ]
do
echo -n "Укажите путь к домашнему каталогу пользователей (пример - /home/): "
read userPath
done

sed -i 's/var userPath;/var userPath = '\`$(echo $userPath | sed 's:/:\\\/:g')\`';/' /var/www/azdav/app_server/routes/importAPI.js
sed -i 's/var userPath;/var userPath = '\`$(echo $userPath | sed 's:/:\\\/:g')\`';/' /var/www/azdav/app_server/routes/addUserAPI.js

cd /var/www/azdav/app_server/
npm i
cd /var/www/azdav/app_client/
npm i
cd /var/www/azdav/
npm i


# Включаем автозапуск nginx при старте системы
systemctl enable nginx

# Запуск nginx
systemctl restart nginx

echo "Установка успешно завершена!"