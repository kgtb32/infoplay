import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { settingsMenu } from '../../../menus/settings';
import { InlineListMetadata } from '../../../models/components/inline-list-metadata';
import { MenuStateService } from '../menu-state.service';
import { SettingsMenuService } from './settings-menu.service';
import { filter } from 'rxjs';
import { WifiSettingsMenuService } from './wifi/wifi-settings-menu.service';


describe('SettingsMenuService', () => {
  let service: SettingsMenuService;

  let menuStateService: MenuStateService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
      ]
    });
    menuStateService = TestBed.inject(MenuStateService)
    service = TestBed.inject(SettingsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should open the settings menu when requested", () => {
    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => expect(state.items.length).toBe(settingsMenu.length)
    })
    menuStateService.menuOpen.next({ menuId: SettingsMenuService.ID })
  })

  it("should request for wifi menu oepn", () => {
    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => {
        expect(state.items.length).toBe(settingsMenu.length)
        state.items[0]?.action?.(state.items[0])
      }
    })
    menuStateService.menuOpen
      .pipe(filter(item => item.menuId != SettingsMenuService.ID))
      .subscribe({
        next: (item) => expect(item.menuId).toEqual(WifiSettingsMenuService.ID)
      })
    menuStateService.menuOpen.next({ menuId: SettingsMenuService.ID })

  })
});
