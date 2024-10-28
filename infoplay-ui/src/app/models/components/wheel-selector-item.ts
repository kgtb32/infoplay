export interface WheelSelectorItemDescription {
    description?: string;
    releaseDate?: string;
    genres?: string[];
    players?: number;
    platform?: string;
    company?: string
}

export interface WheelSelectorItem {
    id: number
    name: string
    image?: string
    description?: WheelSelectorItemDescription,
    icon?: string
    action?: (item: WheelSelectorItem) => void
}