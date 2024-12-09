package dev.kgtb32.infoplay.infoplay_web.services;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.Cache.ValueWrapper;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.kgtb32.infoplay.infoplay_web.entities.Game;
import dev.kgtb32.infoplay.infoplay_web.entities.GameCore;
import dev.kgtb32.infoplay.infoplay_web.entities.Platform;
import dev.kgtb32.infoplay.infoplay_web.exceptions.RestBadRequest;
import dev.kgtb32.infoplay.infoplay_web.exceptions.RestNotFound;
import dev.kgtb32.infoplay.infoplay_web.mappers.GameDtoEntityMapper;
import dev.kgtb32.infoplay.infoplay_web.models.cache.GameResponseCacheMetadata;
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

    private static final String GAME_CACHE_NAME = "games";

    private final GameDtoEntityMapper gameMapper;
    
    private final GameRunnerService gameRunnerService;
    private final FileService fileService;

    private final GameRepository gameRepository;
    private final GameCoreRepository gameCoreRepository;
    private final PlatformRepository platformRepository;

    private final CacheManager cacheManager;



    @Transactional
    public Optional<GameResponseDto> createGame(GameCreateDto gameCreateDto, MultipartFile image, MultipartFile game){
        cacheManager.getCache(GAME_CACHE_NAME).clear();
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

    private List<Game> getGameList(String platformId, String letter){
        return switch(letter){
            case "0" -> this.gameRepository.findAllGamesByPlatformAndRegex(platformId, "^\\d+");
            case "#" -> this.gameRepository.findAllGamesByPlatformAndRegex(platformId, "^[^A-Za-z\\d]+");
            case null -> this.gameRepository.findAllByDescriptionPlatformName(platformId);
            default -> this.gameRepository.findAllByDescriptionPlatformNameAndNameStartingWithIgnoreCase(platformId, letter);
        };
    }

    @Transactional
    public GameResponseDto[] getGamesByPlatform(String platformId, String letter) {
        GameResponseCacheMetadata cacheMetadata = new GameResponseCacheMetadata(platformId, letter);
        ValueWrapper value = cacheManager.getCache(GAME_CACHE_NAME).get(cacheMetadata);
        if(value != null){
            return (GameResponseDto[]) value.get();
        }
        GameResponseDto[] games =  getGameList(platformId, letter)
            .parallelStream()
            .map(gameMapper::gameToResponseDto)
            .toArray(size -> new GameResponseDto[size]);
        cacheManager.getCache(GAME_CACHE_NAME).put(cacheMetadata, games);
        return games;
    }

    @Transactional
    public List<GameResponseDto> toggleGameFavorite(long gameId){
        Game game = this.gameRepository.findById(gameId)
                        .orElseThrow(() -> new RestNotFound("Game with gameid couldn't be found"));
        game.setFavorite(!game.isFavorite());
        this.gameRepository.save(game);
        return getFavoritesGames();
    }
}
