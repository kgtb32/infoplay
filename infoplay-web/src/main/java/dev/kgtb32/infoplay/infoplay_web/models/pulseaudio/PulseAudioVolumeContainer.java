package dev.kgtb32.infoplay.infoplay_web.models.pulseaudio;

import com.fasterxml.jackson.annotation.JsonAlias;

public record PulseAudioVolumeContainer(
    @JsonAlias("front-left")
    PulseAudioVolume frontLeft,
    @JsonAlias("front-right")
    PulseAudioVolume frontRight
) {
    
}
