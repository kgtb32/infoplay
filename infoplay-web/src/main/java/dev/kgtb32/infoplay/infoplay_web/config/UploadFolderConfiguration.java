package dev.kgtb32.infoplay.infoplay_web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.upload-folder")
public record UploadFolderConfiguration(
    String imageDestinationFolder,
    String platformImageDestinationFolder,
    String gameDestinationFolder
) {

    public String getLast(String path){
        String[] paths = path.split("/");
        return paths[paths.length - 1];
    }
}
