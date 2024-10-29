import { Injectable } from '@angular/core';
import { MenuStateService } from '../menu-state.service';
import { settingsMenu } from '../../../menus/settings';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';

@Injectable({
  providedIn: 'root'
})
export class SettingsMenuService {

  constructor(
    private readonly menuStateService: MenuStateService
  ) { }

  settings() {
    this.menuStateService.menuChanged.next(
      settingsMenu.map(settingEntry => ({ ...settingEntry, action: this.settingItemSelected.bind(this) }))
    )
  }

  private settingItemSelected(item: WheelSelectorItem) {
    alert(item.name)
  }
}
