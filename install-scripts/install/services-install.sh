#!/bin/bash

dialog --backtitle "$APP_BACK_TITLE" --infobox "Installing services ..." 3 30
sleep 1
cp /tmp/infoplay/config/runInfoplayWebapp /usr/bin/
cp /tmp/infoplay/config/runInfoplayBackend /usr/bin/

chmod a+x /usr/bin/runInfoplayWebapp
chmod a+x /usr/bin/runInfoplayBackend

sleep 1
dialog --backtitle "$APP_BACK_TITLE" --infobox "Services installed ..." 3 30
sleep 1
clear