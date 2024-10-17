export interface WheelSelectorItemDescription {
    description?: string;
    releaseYear?: string;
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