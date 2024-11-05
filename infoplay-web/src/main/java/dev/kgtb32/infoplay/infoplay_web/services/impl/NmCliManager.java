package dev.kgtb32.infoplay.infoplay_web.services.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.exceptions.command.CommandFailedException;
import dev.kgtb32.infoplay.infoplay_web.models.wifi.WifiNetwork;
import dev.kgtb32.infoplay.infoplay_web.services.WifiManager;
import dev.kgtb32.infoplay.infoplay_web.services.impl.CommandRunner.CommandResult;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NmCliManager implements WifiManager{

    private final NmCliCommandGenerator commandGenerator;
    private final CommandRunner commandRunner;
    private final NmCliWifiNetworkParser networkParser;
    
    @Override
    public List<WifiNetwork> wifiNetworks() {
        try{
            CommandResult commandResult = commandRunner.runCommand(commandGenerator.listWifiNetworks());
            if(commandResult.stdout().isBlank()){
                throw new CommandFailedException(commandResult.stderr());
            }
            return networkParser.parseWifiNetworks(commandResult.stdout());
        }catch(CommandFailedException e){
            return Collections.emptyList();
        }
    }    
}
