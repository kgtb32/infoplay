import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { GameLoadModule } from './pages/game-load/game-load.module';
import { FavoritesGamesModule } from './pages/favorites-games/favorites-games.module';
import { PlatformsListModule } from './pages/platforms-list/platforms-list.module';
import { GamesByPlatformModule } from './pages/games-by-platform/games-by-platform.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FavoritesGamesModule,
    PlatformsListModule,
    GamesByPlatformModule,
    GameLoadModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
