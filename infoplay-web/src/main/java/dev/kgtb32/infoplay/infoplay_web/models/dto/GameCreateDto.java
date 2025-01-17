package dev.kgtb32.infoplay.infoplay_web.models.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record GameCreateDto(
    @NotBlank
    String name,
    @NotBlank
    String platform,
    @Valid
    GameDescriptionDto description,
    boolean favorite
){
}
