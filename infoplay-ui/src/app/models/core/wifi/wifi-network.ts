export interface WifiNetwork {
    inUse: boolean
    bssid: string
    ssid: string
    mode: string
    chan: number
    rate: string
    signal: number
    security: string
}