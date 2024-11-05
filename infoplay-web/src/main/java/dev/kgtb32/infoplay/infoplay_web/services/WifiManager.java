package dev.kgtb32.infoplay.infoplay_web.services;

import java.util.List;

import dev.kgtb32.infoplay.infoplay_web.models.wifi.WifiNetwork;

public interface WifiManager {
    List<WifiNetwork> wifiNetworks();
}
