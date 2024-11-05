package dev.kgtb32.infoplay.infoplay_web.services.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

@Service
public class NmCliCommandGenerator {
    private static final List<String> BASE_COMMAND = List.of(
        "nmcli",
        "-t"
    );

    private static final List<String> ENABLED_FIELDS = List.of(
        "SSID",
        "BSSID",
        "FREQ",
        "RATE",
        "BANDWIDTH",
        "SIGNAL",
        "SECURITY",
        "DEVICE",
        "ACTIVE",
        "IN-USE"
    );

    public List<String> listWifiNetworks(){
        return Stream.concat(
            BASE_COMMAND.stream(),
            List.of(
                "--fields",
                ENABLED_FIELDS.stream().collect(Collectors.joining(",")),
                "device",
                "wifi",
                "list"
            ).stream()
        ).toList();
    }
}
