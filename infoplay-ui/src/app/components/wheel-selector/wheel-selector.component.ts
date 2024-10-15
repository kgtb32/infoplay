import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { slice } from 'lodash'
import { moveUp } from '../../services/wheel-selector/wheel-selector-up';
import { JoypadService } from '../../services/joypad.service';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-wheel-selector',
  templateUrl: './wheel-selector.component.html',
  styleUrl: './wheel-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WheelSelectorComponent implements AfterViewInit {
  private static readonly MAX_ITEMS = 16
  private static readonly THREESHOLD = 150

  private lastMovement: number = new Date().getTime()

  constructor(private readonly joypadService: JoypadService, private readonly cd: ChangeDetectorRef, private readonly audioService: AudioService) {
  }

  ngAfterViewInit(): void {
    this.joypadService.axisMoveEvent.subscribe({
      next: button => this.axisMoved.bind(this)(button),
    })
    this.joypadService.buttonPressEvent.subscribe({
      next: () => this.audioService.valid()
    })
  }

  private axisMoved(button: ButtonPressedDetails) {
    if (new Date().getTime() - this.lastMovement > WheelSelectorComponent.THREESHOLD) {
      this.lastMovement = new Date().getTime()
      if (button.directionOfMovement == 'left') {
        this.moveDown()
      }
      else if (button.directionOfMovement == 'right') {
        this.moveUp()
      }
    }
  }

  @Input()
  set items(items: WheelSelectorItem[]) {
    this._items = items
    this.visibleItems = slice(this._items, 0, WheelSelectorComponent.MAX_ITEMS)
  }

  private _items: WheelSelectorItem[] = []

  visibleItems: WheelSelectorItem[] = []
  selectedIndex: number = 0

  private boundsSelectedIndex(dir: 'UP' | 'DOWN') {
    if (this.selectedIndex >= this._items.length && dir == 'UP') {
      this.selectedIndex = 0
    }
    else if (this.selectedIndex < 0 && dir == 'DOWN') {
      this.selectedIndex = this._items.length - 1
    }
  }

  moveUp() {
    this.selectedIndex++
    this.boundsSelectedIndex('UP')
    this.visibleItems = moveUp(WheelSelectorComponent.MAX_ITEMS, this.selectedIndex, this._items)
    this.cd.detectChanges()
    this.audioService.select()
  }

  moveDown() {
    this.selectedIndex--
    this.boundsSelectedIndex('DOWN')
    this.visibleItems = moveUp(WheelSelectorComponent.MAX_ITEMS, this.selectedIndex, this._items)
    this.cd.detectChanges()
    this.audioService.select()
  }
}
