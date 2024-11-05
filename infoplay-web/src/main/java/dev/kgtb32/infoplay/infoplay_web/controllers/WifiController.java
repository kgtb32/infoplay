package dev.kgtb32.infoplay.infoplay_web.controllers;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kgtb32.infoplay.infoplay_web.models.wifi.WifiNetwork;
import dev.kgtb32.infoplay.infoplay_web.services.impl.NmCliManager;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/wifi")
@AllArgsConstructor
public class WifiController {
    private final NmCliManager nmCliManager;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping("/networks")
    public ResponseEntity<List<WifiNetwork>> getWifiNetworks(){
        return ResponseEntity.ok(nmCliManager.wifiNetworks());
    }

}
