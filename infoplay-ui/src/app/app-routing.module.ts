import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesGamesComponent } from './pages/favorites-games/favorites-games.component';
import { GameLoadComponent } from './pages/game-load/game-load.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesGamesComponent
  },
  {
    path: 'game/:id/play',
    component: GameLoadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
