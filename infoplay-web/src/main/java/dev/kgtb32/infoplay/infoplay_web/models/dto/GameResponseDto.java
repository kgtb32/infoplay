package dev.kgtb32.infoplay.infoplay_web.models.dto;

import dev.kgtb32.infoplay.infoplay_web.entities.GameDescription;

public record GameResponseDto(
    long id,
    String name,
    GameDescription description,
    byte[] image,
    boolean favorite
) {
} 

