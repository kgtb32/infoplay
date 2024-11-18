import { WheelSelectorItem } from "../../models/components/wheel-selector-item";
import { Sink } from "../../models/core/audio/sink";

export function mapSinkToWheelSelectorItem(sink: Sink): WheelSelectorItem {
    return {
        id: sink.index,
        name: sink.description,
        description: {
            description: `
            volume: ${sink.baseVolume.valuePercent}%\n
            actif: ${sink.state === 'RUNNING'}
           `
        },
        icon: 'tablerVolume'
    }
}

export function mapSinksToWheelSelectorItems(sinks: Sink[]): WheelSelectorItem[] {
    return sinks.map(mapSinkToWheelSelectorItem)
}