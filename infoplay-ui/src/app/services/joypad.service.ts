import { Injectable } from '@angular/core';
import 'joypad.js';
import { Subject } from 'rxjs';
import { ExtendedWindow } from '../models/core/extended-window';
import { ButtonPressedDetails, Gamepad } from '../models/core/joypad/joypad-connect-event';

declare let window: ExtendedWindow;

@Injectable({
  providedIn: 'root'
})
export class JoypadService {

  readonly connectEvent: Subject<Gamepad> = new Subject<Gamepad>();
  readonly buttonPressEvent: Subject<ButtonPressedDetails> = new Subject<ButtonPressedDetails>();
  readonly axisMoveEvent: Subject<ButtonPressedDetails> = new Subject<ButtonPressedDetails>();

  constructor() {
    window.joypad.on('connect', (event) => this.connectEvent.next(event.gamepad))
    window.joypad.on('button_press', (event) => this.buttonPressEvent.next(event.detail))
    window.joypad.on('axis_move', event => this.axisMoveEvent.next(event.detail))
  }
}
