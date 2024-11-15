import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { MenuStateService } from './menu-state.service';
import { AppsMenuService } from './apps/apps-menu.service';
import { FavoritesService } from './favorites/favorites.service';
import { GameConsolesMenuService } from './game/game-consoles-menu.service';
import { SettingsMenuService } from './settings/settings-menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let menuStateService: MenuStateService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    menuStateService = TestBed.inject(MenuStateService)
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return the corect menu callback function", () => {
    const spy = spyOn(menuStateService.menuOpen, "next")
    const categoriesIdsAssociations: { [key: string]: string } = {
      "Favoris": FavoritesService.ID,
      "Jeux": GameConsolesMenuService.ID,
      "Paramètres": SettingsMenuService.ID,
      "Applications": AppsMenuService.ID,
    }
    Object.entries(categoriesIdsAssociations).forEach(([key, val]) => {
      service.categoryChanged(key)
      expect(spy).toHaveBeenCalledWith({ menuId: val })
    })
  })
});
