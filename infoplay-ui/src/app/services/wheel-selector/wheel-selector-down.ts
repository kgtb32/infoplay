import { WheelSelectorItem } from "../../models/components/wheel-selector-item"

export function moveDown(selectedIndex: number, maxItems: number, items: WheelSelectorItem[]) {
    let index = selectedIndex
    const finalArray = new Array()
    for (let i = 0; i < maxItems; i++) {
        if (index >= items.length) {
            index = 0
        }
        finalArray.push(items[index])
        index++
    }
    return finalArray
}