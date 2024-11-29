import { Injectable } from '@angular/core';
import 'joypad.js';
import { filter, Subject } from 'rxjs';
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

  joypadEnabled: boolean = true;

  currentEnabledIds: string[] = []

  constructor() {
    window.joypad.on('connect', (event) => this.joypadEnabled && this.connectEvent.next(event.gamepad))
    window.joypad.on('button_press', (event) => this.joypadEnabled && this.buttonPressEvent.next(event.detail))
    window.joypad.on('axis_move', event => this.joypadEnabled && this.axisMoveEvent.next(event.detail))
  }

  private isEventFiteredById(id: string): boolean {
    return this.currentEnabledIds.includes(id) || this.currentEnabledIds.length === 0
  }

  axisMoveEventFiltered(id: string) {
    return this.axisMoveEvent.asObservable().pipe(filter(() => this.isEventFiteredById(id)))
  }

  buttonPressEventFiltered(id: string) {
    return this.buttonPressEvent.asObservable().pipe(filter(() => this.isEventFiteredById(id)))
  }

  restricForId(id: string) {
    this.currentEnabledIds = [id]
  }

  allowAll() {
    this.currentEnabledIds = []
  }
}
