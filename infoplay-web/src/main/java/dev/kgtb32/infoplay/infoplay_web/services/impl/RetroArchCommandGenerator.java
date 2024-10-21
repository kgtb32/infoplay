package dev.kgtb32.infoplay.infoplay_web.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.config.RetroArchConfiguration;
import dev.kgtb32.infoplay.infoplay_web.entities.Game;
import dev.kgtb32.infoplay.infoplay_web.services.GameCommandGenerator;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class RetroArchCommandGenerator implements GameCommandGenerator {

    private static final String FULL_SCREEN_ARGUMENT = "-f";
    private static final String CORE_LINKING_ARGUMENT = "-L";

    private RetroArchConfiguration retroArchConfiguration;

    @Override
    public Optional<List<String>> getStartGameCommand(Game game){
        if(game == null || game.getCore() == null){
            return Optional.empty();
        }
        return Optional.of(
            Stream.concat(
                retroArchConfiguration.RetroArchRunCommand().stream(),
                List.of(
                    FULL_SCREEN_ARGUMENT,
                    CORE_LINKING_ARGUMENT,
                    game.getCore().getLibraryPath(),
                    game.getGamePath()
                ).stream()
            ).toList()
        );
    }
    
}
