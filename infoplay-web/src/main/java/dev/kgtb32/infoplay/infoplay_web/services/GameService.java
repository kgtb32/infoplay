package dev.kgtb32.infoplay.infoplay_web.services;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.kgtb32.infoplay.infoplay_web.config.UploadFolderConfiguration;
import dev.kgtb32.infoplay.infoplay_web.mappers.GameDtoEntityMapper;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameCreateDto;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameResponseDto;
import dev.kgtb32.infoplay.infoplay_web.repository.GameRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class GameService {

    private final UploadFolderConfiguration uploadFolderConfiguration;
    private final GameRepository gameRepository;
    private final GameDtoEntityMapper gameMapper;

    private File saveFile(MultipartFile file, String type) throws IOException{
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        String destFolder = type.equals("image") ? uploadFolderConfiguration.imageDestinationFolder() : uploadFolderConfiguration.gameDestinationFolder();
        File destinationFile = new File(destFolder+UUID.randomUUID()+"."+extension);
        file.transferTo(destinationFile);
        return destinationFile;
    }

    public Optional<GameResponseDto> createGame(GameCreateDto gameCreateDto, MultipartFile image, MultipartFile game){
        File imageFile;
        File gameFile;
        try{
           gameFile =  saveFile(game, "game");
           imageFile = saveFile(image, "image");
           return Optional.of(
            gameMapper.gameToResponseDto(
                gameRepository.save(gameMapper.dtoToGame(gameCreateDto, gameFile, imageFile)))
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
}
