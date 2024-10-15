import { Joypad } from "./joypad/joypad";

export interface ExtendedWindow extends Window {
    joypad: Joypad
}
