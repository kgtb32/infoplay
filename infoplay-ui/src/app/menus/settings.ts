import { WheelSelectorItem } from "../models/components/wheel-selector-item";

export const settingsMenu: WheelSelectorItem[] = [
    {
        id: 0,
        icon: 'tablerWifi',
        name: 'Wifi',
        description: {
            description: "Configuration du wifi"
        }
    },
    {
        id: 1,
        icon: 'tablerVolume',
        name: 'Audio',
        description: {
            description: "Configuration de l'audio",
        }
    },
    {
        id: 2,
        icon: 'tablerBluetooth',
        name: 'Bluetooth',
        description: {
            description: "Configuration du bluetooth",
        }
    }
]