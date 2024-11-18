import { SinkVolume } from "./sink-volume"
import { SinkVolumeContainer } from "./sink-volume-container"

export interface Sink {
    index: number
    state: string
    name: string
    description: string
    driver: string
    sampleSpecification: string
    channelMap: string
    ownerModule: number
    mute: boolean
    volume: SinkVolumeContainer
    balance: number
    baseVolume: SinkVolume
    latency: {
        actual: number
        configured: number
    }
    flags: string[]
    properties: { [key: string]: string }
    activePort: string
    formats: string[]
}