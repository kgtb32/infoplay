package dev.kgtb32.infoplay.infoplay_web.services;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.kgtb32.infoplay.infoplay_web.entities.Platform;
import dev.kgtb32.infoplay.infoplay_web.exceptions.RestBadRequest;
import dev.kgtb32.infoplay.infoplay_web.mappers.PlatformDTOEntityMapper;
import dev.kgtb32.infoplay.infoplay_web.models.dto.platform.PlatformCreateDTO;
import dev.kgtb32.infoplay.infoplay_web.models.enums.EnumFileType;
import dev.kgtb32.infoplay.infoplay_web.repository.PlatformRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PlatformService {

    private final FileService fileService;

    private final PlatformRepository platformRepository;

    private final PlatformDTOEntityMapper platformDTOEntityMapper;

    public Platform createPlatform(PlatformCreateDTO platformCreate, MultipartFile file){
        File image;
        try{
            image = fileService.saveFile(file, EnumFileType.PLATFORM_IMAGE);
            return platformRepository.save(
                platformDTOEntityMapper.dtoToPlatform(platformCreate, image)
            );
        }
        catch(IOException e){
            throw new RestBadRequest(e.getMessage());
        }
    }

    public List<Platform> listAllPlatforms(){
        return platformRepository.findAll();
    }
}
