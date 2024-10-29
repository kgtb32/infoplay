import { ENVIRONMENT_INITIALIZER, inject, NgModule, ProviderToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from './favorites/favorites.service';
import { SettingsMenuService } from './settings/settings-menu.service';
import { WifiSettingsMenuService } from './settings/wifi/wifi-settings-menu.service';
import { AppsMenuService } from './apps/apps-menu.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ENVIRONMENT_INITIALIZER, useValue: () => {
        [
          FavoritesService,
          SettingsMenuService,
          WifiSettingsMenuService,
          AppsMenuService
        ].forEach((s: ProviderToken<unknown>) => inject(s))
      }, multi: true
    },

  ]
})
export class MenuModule { }
