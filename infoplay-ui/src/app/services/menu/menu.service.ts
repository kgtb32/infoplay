import { Injectable } from '@angular/core';
import { FavoritesService } from './favorites/favorites.service';
import { MenuStateService } from './menu-state.service';
import { SettingsMenuService } from './settings/settings-menu.service';
import { AppsMenuService } from './apps/apps-menu.service';
import { GameConsolesMenuService } from './game/game-consoles-menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly categoriesPages: { [key: string]: () => void } = {
    "Favoris": () => this.menuStateService.menuOpen.next({ menuId: FavoritesService.ID }),
    "Jeux": () => this.menuStateService.menuOpen.next({ menuId: GameConsolesMenuService.ID }),
    "Paramètres": () => this.menuStateService.menuOpen.next({ menuId: SettingsMenuService.ID }),
    "Applications": () => this.menuStateService.menuOpen.next({ menuId: AppsMenuService.ID }),
  }

  constructor(
    private readonly menuStateService: MenuStateService
  ) { }

  categoryChanged(category: string): void {
    return this.categoriesPages[category]?.()
  }
}
