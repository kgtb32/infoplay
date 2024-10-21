package dev.kgtb32.infoplay.infoplay_web.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.retroarch")
public record RetroArchConfiguration(
    List<String> RetroArchRunCommand
) {
}
