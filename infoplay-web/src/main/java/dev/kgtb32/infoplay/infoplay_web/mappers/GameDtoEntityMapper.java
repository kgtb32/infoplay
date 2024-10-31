package dev.kgtb32.infoplay.infoplay_web.mappers;

import java.io.File;

import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.config.UploadFolderConfiguration;
import dev.kgtb32.infoplay.infoplay_web.entities.Game;
import dev.kgtb32.infoplay.infoplay_web.entities.GameCore;
import dev.kgtb32.infoplay.infoplay_web.entities.GameDescription;
import dev.kgtb32.infoplay.infoplay_web.entities.Platform;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameCreateDto;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameResponseDto;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GameDtoEntityMapper {

    private final UploadFolderConfiguration uploadFolderConfiguration;

    public Game dtoToGame(GameCreateDto gameCreateDto, File game, File image, GameCore core, Platform platform){
        return Game
            .builder()
            .name(gameCreateDto.name())
            .gamePath(game.getAbsolutePath())
            .imagePath(uploadFolderConfiguration.getLast(uploadFolderConfiguration.imageDestinationFolder()) + "/" + image.getName())
            .favorite(false)
            .description(
                GameDescription
                .builder()
                .platform(platform)
                .description(gameCreateDto.description().description())
                .rating(gameCreateDto.description().rating())
                .releaseDate(gameCreateDto.description().releaseDate())
                .developer(gameCreateDto.description().developer())
                .publisher(gameCreateDto.description().publisher())
                .genres(gameCreateDto.description().genres())
                .players(gameCreateDto.description().players())
                .build()
            )
            .core(core)
            .build();
    }

    public GameResponseDto gameToResponseDto(Game game){
        return new GameResponseDto(
            game.getId(),
            game.getName(),
            game.getDescription(),
            game.getImagePath(),
            game.isFavorite()
        );
    }
    
}
