import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { filter } from 'rxjs';
import { JoypadService } from '../../../services/joypad.service';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';
import { NextGenComboboxOverlayComponent } from '../next-gen-combobox-overlay/next-gen-combobox-overlay.component';

@Component({
  selector: 'app-next-gen-combobox',
  templateUrl: './next-gen-combobox.component.html',
  styleUrl: './next-gen-combobox.component.scss'
})
export class NextGenComboboxComponent extends NextGenBaseComponent {
  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly joypadService: JoypadService
  ) {
    super()
  }

  entries: { key: string, value: string }[] = []

  _items: { [key: string]: string } = {};

  selectedValue: string = ""

  selected: boolean = false

  displayModal: boolean = false

  @Input()
  itemSelected: EventEmitter<string> = new EventEmitter()

  comboboxValueSelected(key: string) {
    this.itemSelected.next(key)
    this.displayModal = false
    this.joypadService.allowAll()
    this.selectedValue = key
    this.cd.detectChanges()
  }

  @Input()
  set items(items: { [key: string]: string }) {
    this._items = items
    this.entries = Object.entries(this._items).map(([key, value]) => ({
      key,
      value,
    }))
    this.selectedValue = this.entries[0]?.key ?? ''
  }

  override afterPositionChanged(positionChanged: EventEmitter<number>): void {
    positionChanged.asObservable().subscribe({
      next: position => this.selected = this.currentPosition === position
    })
  }

  override afterClickedEventChanged(clickedEvent: EventEmitter<void>): void {
    clickedEvent.asObservable()
      .pipe(filter(() => this.selected))
      .subscribe({
        next: () => {
          this.displayModal = true
          this.joypadService.restricForId(NextGenComboboxOverlayComponent.JOYPAD_SCENE_ID)
          this.cd.detectChanges()
        }
      })
  }
}
