#!/bin/bash
echo "Make sure this script is launched using the regular user account. if not press CTRL + C to cancel"

sleep 10

export APP_BACK_TITLE="InfoPlay INSTALL"

dialog \
    --backtitle "$APP_BACK_TITLE"\
    --title "$APP_BACK_TITLE"\
    --ok-label "Continue"\
    --msgbox "Welcome to the InfoPlay POST Installer Wizzard.\n\nPress Enter to continue." 20 30

bash ./post-install/00-install-sysctl.sh
bash ./post-install/01-deploy-webapp.sh
bash ./post-install/02-deploy-backend.sh