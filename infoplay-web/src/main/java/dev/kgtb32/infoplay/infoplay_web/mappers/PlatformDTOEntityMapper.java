package dev.kgtb32.infoplay.infoplay_web.mappers;

import java.io.File;
import org.springframework.stereotype.Service;

import dev.kgtb32.infoplay.infoplay_web.entities.Platform;
import dev.kgtb32.infoplay.infoplay_web.entities.PlatformDescription;
import dev.kgtb32.infoplay.infoplay_web.models.dto.platform.PlatformCreateDTO;

@Service
public class PlatformDTOEntityMapper {
    public Platform dtoToPlatform(PlatformCreateDTO createDTO, File image) {
        return Platform
            .builder()
            .displayName(createDTO.displayName())
            .name(createDTO.name())
            .description(
                PlatformDescription
                    .builder()
                    .description(createDTO.description().description())
                    .publisher(createDTO.description().publisher())
                    .releaseDate(createDTO.description().releaseDate())
                    .build()
            )
            .imagePath(image.getAbsolutePath())
            .build();
    }
}
