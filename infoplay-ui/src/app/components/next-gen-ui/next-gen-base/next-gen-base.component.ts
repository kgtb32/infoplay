import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-next-gen-base',
  template: ''
})
export abstract class NextGenBaseComponent {
  public readonly iconSize = '2em'

  _clickedEvent: EventEmitter<void> = new EventEmitter()
  _positionChanged: EventEmitter<number> = new EventEmitter()

  @Input()
  currentPosition: number = 0

  @Input()
  set clickedEvent(clickedEvent: EventEmitter<void>) {
    this._clickedEvent = clickedEvent
    this.afterClickedEventChanged(clickedEvent)
  }

  @Input()
  set positionChanged(positionChangedEvent: EventEmitter<number>) {
    this._positionChanged = positionChangedEvent
    this.afterPositionChanged(positionChangedEvent)
  }

  abstract afterPositionChanged(positionChanged: EventEmitter<number>): void

  abstract afterClickedEventChanged(clickedEvent: EventEmitter<void>): void
}
