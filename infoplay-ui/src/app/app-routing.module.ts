import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesGamesComponent } from './pages/favorites-games/favorites-games.component';
import { GameLoadComponent } from './pages/game-load/game-load.component';
import { PlatformsListComponent } from './pages/platforms-list/platforms-list.component';
import { GamesByPlatformComponent } from './pages/games-by-platform/games-by-platform.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesGamesComponent
  },
  {
    path: 'game/:id/play',
    component: GameLoadComponent
  },
  {
    path: 'platforms',
    component: PlatformsListComponent
  },
  {
    path: 'platforms/:id/games',
    component: GamesByPlatformComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
