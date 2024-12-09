import { Platform } from "../api/platform";

export interface WheelSelectorItemDescription {
    description?: string;
    releaseDate?: string;
    genres?: string[];
    players?: number;
    platform?: Platform;
    company?: string
}

export interface WheelSelectorItem {
    id: number
    name: string
    image?: string
    description?: WheelSelectorItemDescription,
    icon?: string
    favorite?: boolean
    action?: (item: WheelSelectorItem) => void
}