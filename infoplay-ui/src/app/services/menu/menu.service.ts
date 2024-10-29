import { Injectable } from '@angular/core';
import { FavoritesService } from './favorites/favorites.service';
import { MenuStateService } from './menu-state.service';
import { SettingsMenuService } from './settings/settings-menu.service';
import { AppsMenuService } from './apps/apps-menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly categoriesPages: { [key: string]: () => void } = {
    "Favoris": () => this.menuStateService.menuOpen.next(FavoritesService.ID),
    "Paramètres": () => this.menuStateService.menuOpen.next(SettingsMenuService.ID),
    "Applications": () => this.menuStateService.menuOpen.next(AppsMenuService.ID),
  }

  constructor(
    private readonly menuStateService: MenuStateService
  ) { }

  categoryChanged(category: string): void {
    console.log("categoryChanged", category)
    return this.categoriesPages[category]?.()
  }
}
