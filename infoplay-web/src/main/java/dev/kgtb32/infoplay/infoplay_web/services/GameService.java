package dev.kgtb32.infoplay.infoplay_web.services;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.kgtb32.infoplay.infoplay_web.entities.Game;
import dev.kgtb32.infoplay.infoplay_web.entities.GameCore;
import dev.kgtb32.infoplay.infoplay_web.entities.Platform;
import dev.kgtb32.infoplay.infoplay_web.exceptions.RestBadRequest;
import dev.kgtb32.infoplay.infoplay_web.exceptions.RestNotFound;
import dev.kgtb32.infoplay.infoplay_web.mappers.GameDtoEntityMapper;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameCreateDto;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameResponseDto;
import dev.kgtb32.infoplay.infoplay_web.models.enums.EnumFileType;
import dev.kgtb32.infoplay.infoplay_web.repository.GameCoreRepository;
import dev.kgtb32.infoplay.infoplay_web.repository.GameRepository;
import dev.kgtb32.infoplay.infoplay_web.repository.PlatformRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class GameService {

    private final GameDtoEntityMapper gameMapper;
    
    private final GameRunnerService gameRunnerService;
    private final FileService fileService;

    private final GameRepository gameRepository;
    private final GameCoreRepository gameCoreRepository;
    private final PlatformRepository platformRepository;



    public Optional<GameResponseDto> createGame(GameCreateDto gameCreateDto, MultipartFile image, MultipartFile game){
        File imageFile;
        File gameFile;
        try{
           gameFile =  fileService.saveFile(game, EnumFileType.GAME_FILE);
           imageFile = fileService.saveFile(image, EnumFileType.GAME_IMAGE_FILE);
           Platform platform = platformRepository
                .findFirstByName(gameCreateDto.platform())
                .orElseThrow(() -> new RestBadRequest("Failed to associate a platform based on the given platformId"));
           GameCore core = gameCoreRepository
                .findFirstByAssociatedPlatformNameOrderByPriorityDesc(gameCreateDto.platform())
                .orElseThrow(() -> new RestBadRequest("Failed to associate a game core based on the given platformId"));
           return Optional.of(
                gameMapper.gameToResponseDto(
                    gameRepository.save(gameMapper.dtoToGame(gameCreateDto, gameFile, imageFile, core, platform)))
                );
        }
        catch(IOException e){
            return Optional.empty();
        }
    }

    @Transactional
    public List<GameResponseDto> getFavoritesGames(){
        return this.gameRepository
            .findAllByFavorite(true)
            .parallelStream()
            .map(gameMapper::gameToResponseDto)
            .toList();
    }

    public boolean runGame(long gameId){
        Game game = this.gameRepository
            .findById(gameId)
            .orElseThrow(() -> new RestNotFound("Game not found !"));
        
        return gameRunnerService.runGame(game);
    }
}
