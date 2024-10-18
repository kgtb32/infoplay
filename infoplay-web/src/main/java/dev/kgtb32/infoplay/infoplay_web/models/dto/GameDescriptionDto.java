package dev.kgtb32.infoplay.infoplay_web.models.dto;

import java.util.List;

public record GameDescriptionDto(
    Float rating,
    String releaseDate,
    String developer,
    String publisher,
    List<String> genres,
    String players
) {
}
