import { EventEmitter } from "@angular/core"

export interface NextgenUiMetadata {
    categoriesConfiguration?: {
        categories: string[]
    }
    components: NextGenComponentWrapper[]
    direction: 'horizontal' | 'vertical'
}

export interface NextGenComponentWrapper {
    componentType: NextGenComponentType
    props: NextGenBaseComponentProps
}

export type NextGenComponentType = 'button' | 'checkbox' | 'combobox' | 'radio' | 'layout' | 'text' | 'title' | 'slider' | 'infiniteLoader'

export interface NextGenBaseComponentProps {
    positionChanged: EventEmitter<number>
    clickedEvent: EventEmitter<void>
    currentPosition: number
}

export interface NextGenButtonProps extends NextGenBaseComponentProps {
    text: string
    icon?: string
    onClick?: EventEmitter<void>
}

export interface NextGenCheckboxProps extends NextGenBaseComponentProps {
    text: string
    checked: boolean
    checkedStateChanged: EventEmitter<boolean>
}

export interface NextGenComboboxProps extends NextGenBaseComponentProps {
    items: { [key: string]: string }
    itemSelected: EventEmitter<string>
}

export interface NextGenRadioProps extends NextGenComboboxProps {
}

export interface NextGenInputTextProps extends NextGenBaseComponentProps {
    text: string
    changed: EventEmitter<string>
    type: 'number' | 'text' | 'password'
}

export interface NextGenTitleProps extends NextGenBaseComponentProps {
    text: string
}

export interface NextGenSliderProps extends NextGenBaseComponentProps {
    maxValue: number
    step: number
    value?: number
    text?: string
    icon?: string
    valueChanged?: EventEmitter<number>
}

export interface NextGenInfiniteLoaderProps extends NextGenBaseComponentProps {
    text: string
    icon: string
    rotateAnimation: boolean
}