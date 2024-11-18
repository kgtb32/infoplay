import { Injectable } from '@angular/core';
import { settingsMenu } from '../../../menus/settings';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';
import { MenuStateService } from '../menu-state.service';
import { WifiSettingsMenuService } from './wifi/wifi-settings-menu.service';
import { AudioMenuService } from './audio/audio-menu.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsMenuService {
  public static readonly ID = "settings-menu"

  private readonly menuIds = [
    WifiSettingsMenuService.ID,
    AudioMenuService.ID
  ]

  constructor(
    private readonly menuStateService: MenuStateService,
  ) {
    this.menuStateService.menuOpenedFiltered(SettingsMenuService.ID).subscribe({
      next: () => this.settings()
    })
  }

  settings() {
    this.menuStateService.menuChanged.next({
      items: settingsMenu.map(settingEntry => ({ ...settingEntry, action: this.settingItemSelected.bind(this) }))
    })
  }

  private settingItemSelected(item: WheelSelectorItem) {
    this.menuStateService.menuOpen.next({ menuId: this.menuIds[item.id] })
  }
}
