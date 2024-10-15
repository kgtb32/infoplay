import { WheelSelectorItem } from "../../models/components/wheel-selector-item"

export function moveUp(maxItems: number, currentIndex: number, items: WheelSelectorItem[]): WheelSelectorItem[] {
    let finalArray = new Array()
    let index = currentIndex
    for (let i = 0; i < maxItems; i++) {
        if (index < 0) {
            index = items.length - 1
        }
        finalArray = [items[index], ...finalArray]
        index--
    }
    return finalArray
}