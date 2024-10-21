export interface WheelSelectorItemDescription {
    description?: string;
    releaseDate?: string;
    genres?: string[];
    players?: number;
    platform?: string;
    company?: string
}

export interface WheelSelectorItem {
    name: string
    image: string
    description?: WheelSelectorItemDescription
}