#!/bin/bash

rm -rf /home/infoplay/infoplay-webapp

mkdir -p /home/infoplay/infoplay-webapp
chmod a+x /home/infoplay/
chmod a+rx /home/infoplay/infoplay-webapp
chown -R infoplay:infoplay /home/infoplay/infoplay-webapp

cp /tmp/infoplay/config/nginx.conf /etc/nginx/sites-enabled/default
