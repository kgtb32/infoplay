package dev.kgtb32.infoplay.infoplay_web.services;

import java.util.List;
import java.util.Optional;

import dev.kgtb32.infoplay.infoplay_web.entities.Game;

public interface GameCommandGenerator {
    public Optional<List<String>> getStartGameCommand(Game game);
}
