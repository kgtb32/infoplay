import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsModule } from './pages/apps/apps.module';
import { AudioSettingsModule } from './pages/audio-settings/audio-settings.module';
import { FavoritesGamesModule } from './pages/favorites-games/favorites-games.module';
import { GameLoadModule } from './pages/game-load/game-load.module';
import { GamesByPlatformModule } from './pages/games-by-platform/games-by-platform.module';
import { PlatformsListModule } from './pages/platforms-list/platforms-list.module';
import { SettingsModule } from './pages/settings/settings.module';
import { WifiSettingsModule } from './pages/wifi-settings/wifi-settings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FavoritesGamesModule,
    PlatformsListModule,
    GamesByPlatformModule,
    SettingsModule,
    AudioSettingsModule,
    WifiSettingsModule,
    GameLoadModule,
    AppsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
