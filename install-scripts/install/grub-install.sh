#!/bin/bash

#!/bin/bash
dialog --colors --backtitle "$APP_BACK_TITLE"  --title "Bootloader Configuration" --infobox "Autoconfiguring BootLoader ...\n\Z1      ** Please Wait **" 4 35
sleep 1
cp /tmp/infoplay/config/grub /etc/default/grub
sleep 1
update-grub2|dialog  --backtitle "$APP_BACK_TITLE" --title  "Bootloader configuration" --progressbox 40 100
sleep 1
dialog --colors --backtitle "$APP_BACK_TITLE" --title  "Bootloader Configuration" --infobox "Autoconfiguring BootLoader ...\n\Z2         ** DONE **" 4 35
sleep 1
clear