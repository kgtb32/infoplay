package dev.kgtb32.infoplay.infoplay_web.models.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record GameCreateDto(
    @NotBlank
    String name,
    @Valid
    GameDescriptionDto description,
    boolean favorite
){
}
