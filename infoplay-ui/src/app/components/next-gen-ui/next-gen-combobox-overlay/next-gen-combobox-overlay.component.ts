import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { nanoid } from 'nanoid';
import { JoypadService } from '../../../services/joypad.service';
import { MovementDirection } from '../../../models/core/joypad/joypad-connect-event';

@Component({
  selector: 'app-next-gen-combobox-overlay',
  templateUrl: './next-gen-combobox-overlay.component.html',
})
export class NextGenComboboxOverlayComponent {
  public static readonly JOYPAD_SCENE_ID = nanoid(16)
  private static readonly THREESHOLD = 200
  private lastUpdate: number = new Date().getTime()

  current: number = 0

  @Output()
  itemSelected: EventEmitter<string> = new EventEmitter()

  constructor(
    joypadService: JoypadService,
    private readonly cd: ChangeDetectorRef
  ) {
    joypadService.buttonPressEventFiltered(NextGenComboboxOverlayComponent.JOYPAD_SCENE_ID).subscribe({
      next: () => this.itemSelected.next(this.entries[this.current].key)
    })
    joypadService.axisMoveEventFiltered(NextGenComboboxOverlayComponent.JOYPAD_SCENE_ID).subscribe({
      next: event => this.axisMoved(event.directionOfMovement)
    })
  }

  get isThreesholdPassed() {
    return (new Date().getTime() - this.lastUpdate) > NextGenComboboxOverlayComponent.THREESHOLD
  }

  axisMoved(direction: MovementDirection) {
    if (
      this.current == 0 && direction == 'top' ||
      this.current == this.entries.length - 1 && direction == 'bottom' ||
      !this.isThreesholdPassed
    ) {
      return
    }
    this.lastUpdate = new Date().getTime()
    if (direction === 'bottom') {
      this.current++
    } else {
      this.current--
    }
    this.cd.detectChanges()
  }

  @Input()
  items!: { [key: string]: string };

  get entries() {
    return Object.entries(this.items).map(([key, value]) => ({
      key,
      value,
    }));
  }
}
