export interface GamepadButton {
    pressed: boolean;
    touched: boolean;
    value: number;
}

export interface Gamepad {
    axes: number[]
    buttons: GamepadButton[]
    connected: boolean
    id: string
    index: number
    mapping: string
    timestamp: number
    vibrationActuator: any
}

export interface ButtonPressedDetails {
    buttonName: string;
    button: GamepadButton
    gamepad: Gamepad
    axis: number
    axisMovementValue: number
    directionOfMovement: 'left' | 'right' | 'top' | 'bottom'
    stickMoved: 'left_stick' | 'right_stick'
    totalSticks: number
}

export interface GamepadEvent {
    isTrusted: boolean;
    bubbles: boolean;
    cancelBubbles: boolean;
    cancelable: boolean;
    composed: boolean;
    currentTarget: Window
    defaultPrevented: boolean;
    eventPhase: number;
    detail: ButtonPressedDetails
    gamepad: Gamepad
    returnValue: boolean
    type: string
}