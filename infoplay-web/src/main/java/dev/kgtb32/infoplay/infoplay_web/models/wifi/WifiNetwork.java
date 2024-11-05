package dev.kgtb32.infoplay.infoplay_web.models.wifi;

public record WifiNetwork(
    String ssid,
    String bssid,
    String freq,
    String rate,
    String bandwidth,
    byte signal,
    String security,
    String device,
    boolean active,
    boolean inUse
) {
}
