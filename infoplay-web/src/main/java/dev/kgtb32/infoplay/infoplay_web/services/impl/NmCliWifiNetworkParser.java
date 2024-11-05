package dev.kgtb32.infoplay.infoplay_web.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.models.wifi.WifiNetwork;

@Service
public class NmCliWifiNetworkParser {
    private static final byte SSID_INDEX = 0;
    private static final byte BSSID_INDEX = 1;
    private static final byte FREQ_INDEX = 2;
    private static final byte RATE_INDEX = 3;
    private static final byte BANDWIDTHS_INDEX = 4;
    private static final byte SIGNAL_INDEX = 5;
    private static final byte SECURITY_INDEX = 6;
    private static final byte DEVICE_INDEX = 7;
    private static final byte ACTIVE_INDEX = 8;
    private static final byte IN_USE_INDEX = 9;

    public List<WifiNetwork> parseWifiNetworks(String stdout){
        String[] lines = stdout.split("\n");
        List<WifiNetwork> networks = new ArrayList<>();
        for(String line: lines){
            networks.add(
                parseWifiNetwork(line.replace("\\:", "-").split(":"))
            );
        }
        return networks;
    }

    private WifiNetwork parseWifiNetwork(String[] entries){
        if(entries.length != IN_USE_INDEX+1){
            throw new IllegalStateException("Entries size mismatch: MUST be " + IN_USE_INDEX+1);
        }
        return new WifiNetwork(
            Objects.requireNonNullElse(entries[SSID_INDEX],""),
            Objects.requireNonNullElse(entries[BSSID_INDEX],""),
            Objects.requireNonNullElse(entries[FREQ_INDEX],""),
            Objects.requireNonNullElse(entries[RATE_INDEX],""),
            Objects.requireNonNullElse(entries[BANDWIDTHS_INDEX],""),
            parseNumber(entries[SIGNAL_INDEX]),
            Objects.requireNonNullElse(entries[SECURITY_INDEX],""),
            Objects.requireNonNullElse(entries[DEVICE_INDEX],""),
            parseBoolean(entries[ACTIVE_INDEX]),
            parseBoolean(entries[IN_USE_INDEX])
        );
    }

    private byte parseNumber(String text){
        try{
            return Byte.parseByte(text);
        }catch(Exception e){
            return 0;
        }
    }

    private boolean parseBoolean(String booleanString){
        if(booleanString.isEmpty() || booleanString.isBlank()){
            return false;
        }
        return booleanString.equals("oui");
    }
}
