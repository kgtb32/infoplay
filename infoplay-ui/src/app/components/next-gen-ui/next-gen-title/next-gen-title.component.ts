import { Component, EventEmitter, Input } from '@angular/core';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';

@Component({
  selector: 'app-next-gen-title',
  templateUrl: './next-gen-title.component.html',
  styleUrl: './next-gen-title.component.scss'
})
export class NextGenTitleComponent extends NextGenBaseComponent {
  @Input()
  text!: string

  override afterPositionChanged(_positionChanged: EventEmitter<number>): void {
    return
  }
  override afterClickedEventChanged(_clickedEvent: EventEmitter<void>): void {
    return
  }

}
