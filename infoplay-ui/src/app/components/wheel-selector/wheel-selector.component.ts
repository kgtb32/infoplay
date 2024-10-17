import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { slice } from 'lodash';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { AudioService } from '../../services/audio.service';
import { JoypadService } from '../../services/joypad.service';
import { move } from '../../services/wheel-selector/wheel-selector';
import { dTrig } from '../../utils/math-utils';

@Component({
  selector: 'app-wheel-selector',
  templateUrl: './wheel-selector.component.html',
  styleUrl: './wheel-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WheelSelectorComponent implements AfterViewInit {
  private static readonly MAX_ITEMS = 16
  private static readonly THREESHOLD = 150
  private static readonly DEFAULT_SELECTED = 8
  private static readonly ELIPSIS_2A = 400
  private static readonly ELIPSIS_2B = 150

  private static readonly ANIMATOR_CLASS = "wheel-selector-animator"

  private lastMovement: number = new Date().getTime()
  private _items: WheelSelectorItem[] = []

  visibleItems: WheelSelectorItem[] = []
  selectedIndex: number = WheelSelectorComponent.DEFAULT_SELECTED

  @Input()
  set items(items: WheelSelectorItem[]) {
    this._items = items
    this.visibleItems = slice(this._items, 0, WheelSelectorComponent.MAX_ITEMS)
  }

  constructor(
    private readonly joypadService: JoypadService,
    private readonly cd: ChangeDetectorRef,
    private readonly audioService: AudioService,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  ngAfterViewInit(): void {
    this.joypadService.axisMoveEvent.subscribe({
      next: button => this.axisMoved.bind(this)(button),
    })
    this.joypadService.buttonPressEvent.subscribe({
      next: () => this.audioService.valid()
    })
  }

  getGameTransformCss(i: number) {
    const anglePerItem: number = (360 / WheelSelectorComponent.MAX_ITEMS) * i
    return [
      WheelSelectorComponent.ELIPSIS_2A * dTrig(Math.cos, anglePerItem), //X
      WheelSelectorComponent.ELIPSIS_2B * dTrig(Math.sin, anglePerItem) //Y
    ]
  }

  private axisMoved(button: ButtonPressedDetails) {
    if (new Date().getTime() - this.lastMovement > WheelSelectorComponent.THREESHOLD) {
      this.lastMovement = new Date().getTime()
      if (button.directionOfMovement == 'left') this.moveDown()
      else if (button.directionOfMovement == 'right') this.moveUp()
    }
  }

  private boundsSelectedIndex(dir: 'UP' | 'DOWN') {
    if (this.selectedIndex >= this._items.length && dir == 'UP') {
      this.selectedIndex = 0
    }
    else if (this.selectedIndex < 0 && dir == 'DOWN') {
      this.selectedIndex = this._items.length - 1
    }
    this.visibleItems = move(WheelSelectorComponent.MAX_ITEMS, this.selectedIndex, this._items)
    this.afterMovement()
  }

  private animateSelectedItem() {
    const documentElement = this.document.getElementsByClassName(WheelSelectorComponent.ANIMATOR_CLASS)[0].classList
    documentElement.remove(WheelSelectorComponent.ANIMATOR_CLASS)
    setTimeout(() => documentElement.add(WheelSelectorComponent.ANIMATOR_CLASS), 1)
  }

  private afterMovement() {
    this.cd.detectChanges()
    this.animateSelectedItem()
    this.audioService.select()
  }

  moveUp() {
    this.selectedIndex++
    this.boundsSelectedIndex('UP')
  }

  moveDown() {
    this.selectedIndex--
    this.boundsSelectedIndex('DOWN')
  }
}
