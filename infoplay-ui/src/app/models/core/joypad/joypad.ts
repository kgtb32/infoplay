import { GamepadEvent } from "./joypad-connect-event";

export interface Joypad {
    on: (event: string, action: (e: GamepadEvent) => void) => void
    set: (config: any) => void
}