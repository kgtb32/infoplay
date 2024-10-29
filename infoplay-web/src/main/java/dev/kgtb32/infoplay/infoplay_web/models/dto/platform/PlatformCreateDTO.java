package dev.kgtb32.infoplay.infoplay_web.models.dto.platform;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PlatformCreateDTO(
    @NotBlank
    String name,
    @NotBlank
    String displayName,
    @NotNull
    PlatformDescriptionDTO description
) {
}
