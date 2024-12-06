import { EventEmitter } from '@angular/core';
import {
    NextGenButtonProps,
    NextGenComponentWrapper,
    NextGenInfiniteLoaderProps,
    NextGenTitleProps,
    NextgenUiMetadata,
} from '../../models/core/ui/next-gen-ui-metadata';
import { WifiNetwork } from '../../models/core/wifi/wifi-network';

export function wifiMetadataManager(
    backCallback: EventEmitter<void>,
    wifiConnectCallback: EventEmitter<string>,
    wifiNetworks: WifiNetwork[],
): NextgenUiMetadata {
    const finalWifiNetworks: NextGenComponentWrapper[] = wifiNetworks
        .filter((wifi) => !!wifi.ssid)
        .map((wifiNetwork) => wifiNetworkToComponent(wifiNetwork, wifiConnectCallback))
    return {
        direction: 'vertical',
        components: [
            {
                componentType: 'title',
                props: <NextGenTitleProps>{
                    text: 'Wi-Fi',
                },
            },
            {
                componentType: 'button',
                props: <NextGenButtonProps>{
                    onClick: backCallback,
                    text: 'Retour',
                },
            },
            {
                componentType: 'title',
                props: <NextGenTitleProps>{
                    text: 'Réseaux Wi-Fi',
                },
            },
            {
                componentType: 'infiniteLoader',
                props: <NextGenInfiniteLoaderProps>{
                    text: 'Recherche des réseaux Wi-Fi en cours ...',
                    rotateAnimation: true,
                    icon: 'tablerRefresh',
                },
            },
            ...finalWifiNetworks,
        ],
    };
}

function wifiNetworkToComponent(
    wifiNetwork: WifiNetwork,
    wifiConnectCallback: EventEmitter<string>,
): NextGenComponentWrapper {
    const clickedEvent: EventEmitter<void> = new EventEmitter();
    clickedEvent.subscribe({
        next: () => wifiConnectCallback.next(wifiNetwork.ssid),
    });
    return {
        componentType: 'button',
        props: <NextGenButtonProps>{
            onClick: clickedEvent,
            text: wifiNetwork.ssid,
            icon: bars(wifiNetwork.signal),
        },
    };
}

function bars(signal: number) {
    if (signal > 0 && signal < 25) {
        return 'tablerWifi0';
    } else if (signal >= 25 && signal < 50) {
        return 'tablerWifi1';
    } else if (signal >= 50 && signal < 75) {
        return 'tablerWifi2';
    }
    return 'tablerWifi';
}
