package dev.kgtb32.infoplay.infoplay_web.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kgtb32.infoplay.infoplay_web.models.pulseaudio.PulseAudioResponse;
import dev.kgtb32.infoplay.infoplay_web.services.impl.PulseAudioManager;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/audio")
@AllArgsConstructor
public class AudioController {
    private final PulseAudioManager pulseAudioManager;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping("/sinks")
    public ResponseEntity<PulseAudioResponse[]> getAudio(){
        return ResponseEntity.ok(pulseAudioManager.getSources());
    }
    
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping("/setDefault/{sink}")
    public ResponseEntity<Boolean> setDefault(
        @NotBlank @PathVariable("sink") String sink
    ){
        return ResponseEntity.ok(pulseAudioManager.changeSource(sink));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @RequestMapping("/setVolume/{sink}/{volume}")
    public ResponseEntity<Boolean> setVolume(
        @NotBlank @PathVariable("sink") String sink,
        @NotNull @Max(150) @Min(0) @PathVariable("volume") Integer volume
    ){
        return ResponseEntity.ok(pulseAudioManager.changeVolume(sink, volume+""));
    }
}
