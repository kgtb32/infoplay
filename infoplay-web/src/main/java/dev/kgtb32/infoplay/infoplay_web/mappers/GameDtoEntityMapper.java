package dev.kgtb32.infoplay.infoplay_web.mappers;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.entities.Game;
import dev.kgtb32.infoplay.infoplay_web.entities.GameDescription;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameCreateDto;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameResponseDto;

@Service
public class GameDtoEntityMapper {

    public Game dtoToGame(GameCreateDto gameCreateDto, File game, File image){
        return Game
            .builder()
            .name(gameCreateDto.name())
            .gamePath(game.getAbsolutePath())
            .imagePath(image.getAbsolutePath())
            .favorite(false)
            .description(
                GameDescription
                .builder()
                .rating(gameCreateDto.description().rating())
                .releaseDate(gameCreateDto.description().releaseDate())
                .developer(gameCreateDto.description().developer())
                .publisher(gameCreateDto.description().publisher())
                .genres(gameCreateDto.description().genres())
                .players(gameCreateDto.description().players())
                .build()
            )
            .build();
    }

    public GameResponseDto gameToResponseDto(Game game){
        byte[] data;
        try {
            data = FileUtils.readFileToByteArray(new File(game.getImagePath()));
        } catch (IOException|NullPointerException e) {
            data = null;
        }
        return new GameResponseDto(
            game.getId(),
            game.getName(),
            game.getDescription(),
            data,
            game.isFavorite()
        );
    }
    
}
