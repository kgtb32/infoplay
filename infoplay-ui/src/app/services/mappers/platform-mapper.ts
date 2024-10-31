import { Platform } from "../../models/api/platform";
import { WheelSelectorItem } from "../../models/components/wheel-selector-item";

export function mapPlatformToWheelSelector(platform: Platform, id: number): WheelSelectorItem {
    return {
        id,
        name: platform.displayName,
        description: {
            company: platform.description.publisher,
            description: platform.description.description,
            releaseDate: platform.description.releaseDate
        },
        image: platform.imagePath
    }
}