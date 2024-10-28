#!/bin/bash
dialog --backtitle "$APP_BACK_TITLE" --infobox "Enabling services ..." 3 22

sleep 1
mkdir -p /home/infoplay/.local/share/systemd/user

rm -rf /home/infoplay/.config/openbox/
mkdir -p /home/infoplay/.config/openbox/
mkdir -p /home/infoplay/.local/share/systemd/user/

cp /tmp/infoplay/config/autostart /home/infoplay/.config/openbox/autostart
cp -r /tmp/infoplay/config/services/user/* /home/infoplay/.local/share/systemd/user/

systemctl --user daemon-reload

systemctl --user enable infoplay-webapp
systemctl --user enable infoplay-backend

dialog --backtitle "$APP_BACK_TITLE" --infobox "Services enabled." 3 20
sleep 1
clear