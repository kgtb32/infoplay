#!/bin/bash

URL=$(\
  dialog --title "$APP_BACK_TITLE" \
         --backtitle "$APP_BACK_TITLE"\
         --inputbox "Enter the URL to download the infoplay-web artifactory:" 8 40 \
  3>&1 1>&2 2>&3 3>&- \
)
rm -rf /home/infoplay/infoplay-backend
mkdir -p /home/infoplay/infoplay-backend
wget -O /home/infoplay/infoplay-backend/infoplay-web --progress=dot "$URL" 2>&1 |\
grep "%" |\
sed -u -e "s,\.,,g" | awk '{print $2}' | sed -u -e "s,\%,,g"  | dialog --backtitle "$APP_BACK_TITLE" --gauge "Downloading infoplay-web artifact" 10 100

dialog --backtitle "$APP_BACK_TITLE" --infobox "Installing infoplay-web ..." 3 40

mkdir -p /home/infoplay/static/games_image
mkdir -p /home/infoplay/static/games
chmod a+x /home/infoplay/infoplay-backend/infoplay-web

sleep 1

dialog --backtitle "$APP_BACK_TITLE" --infobox "infoplay-web installed." 3 40

sleep 1

clear