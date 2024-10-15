import { Component, Input } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { slice } from 'lodash'
import { moveUp } from '../../services/wheel-selector/wheel-selector-up';

@Component({
  selector: 'app-wheel-selector',
  templateUrl: './wheel-selector.component.html',
  styleUrl: './wheel-selector.component.scss'
})
export class WheelSelectorComponent {
  private static readonly MAX_ITEMS = 16

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
  }

  moveDown() {
    this.selectedIndex--
    this.boundsSelectedIndex('DOWN')
    this.visibleItems = moveUp(WheelSelectorComponent.MAX_ITEMS, this.selectedIndex, this._items)
  }
}
