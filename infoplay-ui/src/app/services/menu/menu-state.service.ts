import { EventEmitter, Injectable } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {

  public readonly menuChanged: EventEmitter<WheelSelectorItem[]> = new EventEmitter()
  public readonly menuOpen: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.menuChanged.next([])
  }

  menuOpenedFiltered(id: string) {
    return this.menuOpen.pipe(filter(menuId => menuId === id))
  }
}
