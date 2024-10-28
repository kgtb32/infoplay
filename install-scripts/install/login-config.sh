#!/bin/bash
dialog --backtitle "$APP_BACK_TITLE"  --infobox "Please Wait ..." 3 30
echo "[SeatDefaults]
autologin-user=infoplay
autologin-user-timeout=0" >> /etc/lightdm/lightdm.conf
systemctl enable lightdm
dialog --backtitle "$APP_BACK_TITLE"  --infobox "Autologin configured." 3 30
sleep 5