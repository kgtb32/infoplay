package dev.kgtb32.infoplay.infoplay_web.models.pulseaudio;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PulseAudioVolume{
    private int value;
    @JsonAlias("value_percent")
    private int valuePercent;
    private String db;

    public void setValuePercent(String value){
        this.valuePercent = Integer.parseInt(value.replace("%", ""));
    }
}
