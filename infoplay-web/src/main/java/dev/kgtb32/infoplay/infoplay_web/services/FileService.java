package dev.kgtb32.infoplay.infoplay_web.services;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.kgtb32.infoplay.infoplay_web.config.UploadFolderConfiguration;
import dev.kgtb32.infoplay.infoplay_web.models.enums.EnumFileType;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class FileService {
    private final UploadFolderConfiguration uploadFolderConfiguration;

    public File saveFile(MultipartFile file, EnumFileType type) throws IOException{
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        String destFolder = switch(type){
            case GAME_FILE -> uploadFolderConfiguration.gameDestinationFolder();
            case GAME_IMAGE_FILE -> uploadFolderConfiguration.imageDestinationFolder();
            case PLATFORM_IMAGE -> uploadFolderConfiguration.platformImageDestinationFolder();
        };
        File destinationFile = new File(destFolder+UUID.randomUUID()+"."+extension);
        file.transferTo(destinationFile);
        return destinationFile;
    }
}
