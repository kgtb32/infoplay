import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { filter } from 'rxjs';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';

@Component({
  selector: 'app-next-gen-checkbox',
  templateUrl: './next-gen-checkbox.component.html',
  styleUrl: './next-gen-checkbox.component.scss'
})
export class NextGenCheckboxComponent extends NextGenBaseComponent {

  constructor(private readonly cd: ChangeDetectorRef) {
    super()
  }

  @Input()
  checkedStateChanged: EventEmitter<boolean> = new EventEmitter()

  @Input()
  text?: string

  _checked: boolean = false

  selected: boolean = false

  @Input()
  set checked(newState: boolean) {
    this._checked = newState
  }

  override afterPositionChanged(positionChanged: EventEmitter<number>): void {
    positionChanged.subscribe({
      next: (value: number) => {
        this.selected = value === this.currentPosition
        this.cd.detectChanges()
      }
    })
  }

  override afterClickedEventChanged(clickedEvent: EventEmitter<void>): void {
    clickedEvent.asObservable()
      .pipe(filter(() => this.selected))
      .subscribe({
        next: () => {
          this._checked = !this._checked
          this.checkedStateChanged.next(this._checked)
          this.cd.detectChanges()
        }
      })
  }
}
