package dev.kgtb32.infoplay.infoplay_web.models.pulseaudio;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAlias;

public record PulseAudioResponse(
    int index,
    String state,
    String name,
    String description,
    String driver,
    @JsonAlias("sample_specification")
    String sampleSpecification,
    @JsonAlias("channel_map")
    String channelMap,
    @JsonAlias("owner_module")
    BigInteger ownerModule,
    boolean mute,
    PulseAudioVolumeContainer volume,
    double balance,
    @JsonAlias("base_volume")
    PulseAudioVolume baseVolume,
    PulseAudioLatency latency,
    List<String> flags,
    Map<String,String> properties,
    @JsonAlias("active_port")
    String activePort,
    List<String> formats
) {
    
}
