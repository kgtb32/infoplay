package dev.kgtb32.infoplay.infoplay_web.models.dto.platform;

import jakarta.validation.constraints.NotBlank;

public record PlatformDescriptionDTO(
    @NotBlank
    String releaseDate,
    @NotBlank
    String description,
    @NotBlank
    String publisher
) {
    
}
