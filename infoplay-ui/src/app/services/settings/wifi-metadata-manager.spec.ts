import { EventEmitter } from "@angular/core"
import { WifiNetwork } from "../../models/core/wifi/wifi-network"
import { wifiMetadataManager } from "./wifi-metadata-manager"
import { NextGenButtonProps } from "../../models/core/ui/next-gen-ui-metadata"

const wifiNetworks: WifiNetwork[] = [
    {
        ssid: 'Test',
        bssid: 'BA-12-A3-F6-04-14',
        freq: '5220 MHz',
        rate: '270 Mbit/s',
        bandwidth: '80 MHz',
        signal: 15,
        security: 'WPA1 WPA2 802.1X',
        device: 'wlp1s0',
        active: false,
        inUse: false,
    },
    {
        ssid: 'Test2',
        bssid: 'BA-12-A3-F6-04-15',
        freq: '5220 MHz',
        rate: '270 Mbit/s',
        bandwidth: '80 MHz',
        signal: 40,
        security: 'WPA1 WPA2 802.1X',
        device: 'wlp1s0',
        active: false,
        inUse: false,
    },
    {
        ssid: 'Test3',
        bssid: 'BA-12-A3-F6-04-16',
        freq: '5220 MHz',
        rate: '270 Mbit/s',
        bandwidth: '80 MHz',
        signal: 65,
        security: 'WPA1 WPA2 802.1X',
        device: 'wlp1s0',
        active: false,
        inUse: false,
    },
    {
        ssid: 'Test4',
        bssid: 'BA-12-A3-F6-04-17',
        freq: '5220 MHz',
        rate: '270 Mbit/s',
        bandwidth: '80 MHz',
        signal: 80,
        security: 'WPA1 WPA2 802.1X',
        device: 'wlp1s0',
        active: false,
        inUse: false,
    },
]

const nonWifiNetworkComponentOffset = 4

describe("wifi metadata manager", () => {
    it("should put the correct icons on the wifi entry on the menu", () => {
        const metadataManager = wifiMetadataManager(new EventEmitter(), new EventEmitter(), wifiNetworks)
        const bars = ["tablerWifi0", "tablerWifi1", "tablerWifi2"]
        for (let i = nonWifiNetworkComponentOffset; i < metadataManager.components.length - 1; i++) {
            const props: NextGenButtonProps = metadataManager.components.at(i)?.props as NextGenButtonProps
            expect(props.icon).toEqual(bars.at(i - nonWifiNetworkComponentOffset))
        }
    })
})