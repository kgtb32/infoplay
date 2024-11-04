import { WheelSelectorItem } from "../models/components/wheel-selector-item";

const STATIC_ENDPOINT = "/static/"

export function getDynamicImageUrl(item: WheelSelectorItem): string {
    return `${STATIC_ENDPOINT}${item.image}`
}