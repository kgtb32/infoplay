package dev.kgtb32.infoplay.infoplay_web.models.pulseaudio;

import com.fasterxml.jackson.annotation.JsonAlias;

public record PulseAudioPort(
    String name,
    String description,
    String type,
    int priority,
    @JsonAlias("availability_group")
    String availabilityGroup,
    String availability
) {    
}
