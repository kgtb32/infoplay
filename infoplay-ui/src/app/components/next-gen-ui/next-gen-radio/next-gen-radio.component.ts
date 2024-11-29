import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { nanoid } from 'nanoid';
import { filter } from 'rxjs';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';

@Component({
  selector: 'app-next-gen-radio',
  templateUrl: './next-gen-radio.component.html',
  styleUrl: './next-gen-radio.component.scss',
})
export class NextGenRadioComponent extends NextGenBaseComponent {
  constructor(private readonly cd: ChangeDetectorRef) {
    super()
  }

  readonly id = nanoid(12)

  actualPosition: number = 0

  @Input()
  itemSelected: EventEmitter<string> = new EventEmitter()

  private get positionDiff() {
    return this.actualPosition - this.currentPosition
  }

  selectedValue: string = ""

  @Input()
  set items(items: { [key: string]: string }) {
    this._items = items
    this.entries = Object.entries(this._items).map(([key, value]) => ({
      key,
      value,
    }))
    this.selectedValue = this.entries[0]?.key ?? ''
  }

  entries: { key: string, value: string }[] = []

  _items: { [key: string]: string } = {};

  override afterPositionChanged(positionChanged: EventEmitter<number>): void {
    positionChanged.asObservable().subscribe({
      next: value => {
        this.actualPosition = value
        this.cd.detectChanges()
      }
    })
  }

  override afterClickedEventChanged(clickedEvent: EventEmitter<void>): void {
    clickedEvent.asObservable()
      .pipe(filter(() => this.positionDiff >= 0 && this.positionDiff < this.entries.length))
      .subscribe({
        next: () => this.buttonClicked()
      })
  }

  private buttonClicked() {
    this.selectedValue = this.entries[this.positionDiff].key
    this.itemSelected.next(this.selectedValue)
    this.cd.detectChanges()
  }
}
