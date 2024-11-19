import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';

@Component({
  selector: 'app-next-gen-button',
  templateUrl: './next-gen-button.component.html',
  styleUrl: './next-gen-button.component.scss',
})
export class NextGenButtonComponent extends NextGenBaseComponent {
  selected: boolean = false

  @Input()
  icon?: string

  @Input()
  text?: string

  constructor(private readonly cd: ChangeDetectorRef) {
    super()
  }

  override afterPositionChanged(positionChanged: EventEmitter<number>): void {
    positionChanged.subscribe({
      next: (value: number) => {
        this.selected = value === this.currentPosition
        this.cd.detectChanges()
      }
    })
  }

  override afterClickedEventChanged(_clickedEvent: EventEmitter<void>): void {
    return
  }
}
