package dev.kgtb32.infoplay.infoplay_web.controllers;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.kgtb32.infoplay.infoplay_web.exceptions.RestBadRequest;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameCreateDto;
import dev.kgtb32.infoplay.infoplay_web.models.dto.GameResponseDto;
import dev.kgtb32.infoplay.infoplay_web.services.GameService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/game")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GameResponseDto> uploadGame(
        @NotNull @Valid @RequestPart("request") GameCreateDto gameCreateDto,
        @NotNull @RequestPart("image") MultipartFile image,
        @NotNull @RequestPart("game") MultipartFile game
    ){
        return ResponseEntity.ok(
            gameService
                .createGame(gameCreateDto, image, game)
                .orElseThrow(RestBadRequest::new)
        );
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping("favorites")
    public ResponseEntity<List<GameResponseDto>> favorites(){
        return ResponseEntity.ok(
            gameService.getFavoritesGames()
        );
    }
}
