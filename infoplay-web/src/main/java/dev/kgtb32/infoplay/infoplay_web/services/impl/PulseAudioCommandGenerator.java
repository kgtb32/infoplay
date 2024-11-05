package dev.kgtb32.infoplay.infoplay_web.services.impl;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

@Service
public class PulseAudioCommandGenerator {
    private static final List<String> BASE_COMMAND = List.of(
        "pactl",
        "--format",
        "json"
    );

    public List<String> pulseAudioListSinksCommand(){
        return Stream.concat(
            BASE_COMMAND.stream(),
            List.of(
                "list",
                "sinks"
            ).stream()
        ).toList();
    }

    public List<String> pulseAudioSetDefaultSink(String sink){
        return Stream.concat(
            BASE_COMMAND.stream(),
            List.of(
                "set-default-sink",
                sink
            ).stream()
        ).toList();
    }

    public List<String> pulseAudioSetVolume(String sink, String volume){
        return Stream.concat(
            BASE_COMMAND.stream(),
            List.of(
                "set-sink-volume",
                sink,
                volume
            ).stream()
        ).toList();
    }
}
