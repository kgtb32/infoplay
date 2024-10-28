#!/bin/bash

apt update | dialog --title "Updating APT cache ..." --mixedgauge "" 45 100 20 --and-widget --no-lines --no-shadow --backtitle "$APP_BACK_TITLE" --progressbox "" 38 94

apt install -y sudo postgresql openbox htop xorg xterm flatpak lightdm nginx unzip pulseaudio network-manager ssh plymouth wget | dialog --title "Installing APT packages ..." --mixedgauge "" 45 100 40 --and-widget --no-lines --no-shadow --backtitle "$APP_BACK_TITLE" --progressbox "" 38 94

flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo | dialog --title "Configuring Flatpak ..." --mixedgauge "" 45 100 60 --and-widget --no-lines --no-shadow --backtitle "$APP_BACK_TITLE" --progressbox "" 38 94

flatpak install -y org.libretro.RetroArch | dialog --title "Installing Retroarch ..." --mixedgauge "" 45 100 80 --and-widget --no-lines --no-shadow --backtitle "$APP_BACK_TITLE" --progressbox "" 38 94

flatpak install -y org.chromium.Chromium | dialog --title "Installing Chromium ..." --mixedgauge "" 45 100 90 --and-widget --no-lines --no-shadow --backtitle "$APP_BACK_TITLE" --progressbox "" 38 94

clear