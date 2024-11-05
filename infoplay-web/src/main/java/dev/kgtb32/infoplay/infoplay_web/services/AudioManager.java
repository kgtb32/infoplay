package dev.kgtb32.infoplay.infoplay_web.services;

import dev.kgtb32.infoplay.infoplay_web.models.pulseaudio.PulseAudioResponse;

public interface AudioManager {
    PulseAudioResponse[] getSources();
    boolean changeSource(String sourceIndex);
    boolean changeVolume(String sink, String volume);
}
