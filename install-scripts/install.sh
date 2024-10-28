#!/bin/bash
echo "Make sure this script is launched using the ROOT user account. if not press CTRL + C to cancel"

sleep 10

apt update
apt install -y dialog

export APP_BACK_TITLE="InfoPlay INSTALL"
export DIALOGRC="suse.rc"

dialog \
    --backtitle "$APP_BACK_TITLE"\
    --title "$APP_BACK_TITLE"\
    --ok-label "Continue"\
    --msgbox "Welcome to the InfoPlay Installer Wizzard.\n\nPress Enter to continue." 20 30

bash ./install/apt-install.sh
bash ./install/login-config.sh
bash ./install/grub-install.sh
bash ./install/services-install.sh
bash ./install/app-install.sh
bash ./install.db-init.sh

dialog \
    --backtitle "$APP_BACK_TITLE"\
    --title "$APP_BACK_TITLE"\
    --ok-label "Continue"\
    --msgbox "INSTALL Has now completed the system initialisation.\nPlease login as main user and run the postinstall install" 20 30

clear