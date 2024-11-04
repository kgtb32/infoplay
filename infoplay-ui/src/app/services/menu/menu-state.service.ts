import { EventEmitter, Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { MenuOpenState } from '../../models/core/state/menu-open-state';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {

  public readonly menuChanged: EventEmitter<InlineListMetadata> = new EventEmitter()
  public readonly menuOpen: EventEmitter<MenuOpenState> = new EventEmitter()

  public readonly directMenuChanged: EventEmitter<WheelSelectorItem[]> = new EventEmitter()

  constructor() {
    this.menuChanged.next({ items: [] })
  }

  menuOpenedFiltered(id: string) {
    return this.menuOpen.pipe(filter(menuId => menuId.menuId === id))
  }
}
