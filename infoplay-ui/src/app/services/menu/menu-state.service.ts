import { EventEmitter, Injectable } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { filter } from 'rxjs';
import { MenuOpenState } from '../../models/core/state/menu-open-state';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {

  public readonly menuChanged: EventEmitter<WheelSelectorItem[]> = new EventEmitter()
  public readonly menuOpen: EventEmitter<MenuOpenState> = new EventEmitter()

  constructor() {
    this.menuChanged.next([])
  }

  menuOpenedFiltered(id: string) {
    return this.menuOpen.pipe(filter(menuId => menuId.menuId === id))
  }
}
