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

import dev.kgtb32.infoplay.infoplay_web.entities.Platform;
import dev.kgtb32.infoplay.infoplay_web.models.dto.platform.PlatformCreateDTO;
import dev.kgtb32.infoplay.infoplay_web.services.PlatformService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/platform")
public class PlatformController {
    private final PlatformService platformService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Platform> create(
        @NotNull @Valid @RequestPart("request") PlatformCreateDTO platformCreateDTO,
        @NotNull @RequestPart("image") MultipartFile image
    ){
        return ResponseEntity.ok(platformService.createPlatform(platformCreateDTO, image));
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Platform>> listPlatforms(){
        return ResponseEntity.ok(platformService.listAllPlatforms());
    }
}
