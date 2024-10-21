package dev.kgtb32.infoplay.infoplay_web.services.impl;

import java.io.IOException;
import java.util.Optional;
import java.util.List;

import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.entities.Game;
import dev.kgtb32.infoplay.infoplay_web.services.GameRunnerService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RetroArchGameRunner implements GameRunnerService{

    private RetroArchCommandGenerator retroArchCommandGenerator;
    
    @Override
    public boolean runGame(Game gameToRun) {
        Optional<List<String>> command = retroArchCommandGenerator.getStartGameCommand(gameToRun);
        if(command.isEmpty()){
            return false;
        }
        try {
            Process gameProcess = new ProcessBuilder(command.get()).start();
            gameProcess.waitFor();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        } catch (InterruptedException e) {
            e.printStackTrace();
            Thread.currentThread().interrupt();
            return false;
        }
    }
}
