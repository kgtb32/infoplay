package dev.kgtb32.infoplay.infoplay_web.models.dto;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotBlank;

public record GameCreateDto(
    @NotBlank
    String name,
    @Nullable
    GameDescriptionDto description,
    boolean favorite
){
}
