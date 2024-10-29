import { Injectable } from '@angular/core';
import { FavoritesService } from './favorites/favorites.service';
import { SettingsMenuService } from './settings/settings-menu.service';
import { AppsMenuService } from './apps/apps-menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly categoriesPages: { [key: string]: () => void } = {
    "Favoris": () => this.favoritesService.favorites(),
    "Paramètres": () => this.settingsMenuService.settings(),
    "Applications": () => this.applicationsMenuService.appsMenu()
  }

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly settingsMenuService: SettingsMenuService,
    private readonly applicationsMenuService: AppsMenuService
  ) { }

  categoryChanged(category: string): void {
    return this.categoriesPages[category]?.()
  }
}
