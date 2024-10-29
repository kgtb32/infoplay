import { Injectable } from '@angular/core';
import { MenuStateService } from '../menu-state.service';
import { GameService } from '../../game.service';
import { Router } from '@angular/router';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private readonly menuStateService: MenuStateService,
    private readonly gameService: GameService,
    private readonly router: Router
  ) { }

  favorites() {
    this.menuStateService.menuChanged.next([])
    this.gameService.getFavoritesGames().subscribe({
      next: (games: WheelSelectorItem[]) => this.menuStateService
        .menuChanged
        .next(games.map(game => ({ ...game, action: this.playGame.bind(this) })))
    })
  }

  private playGame(game: WheelSelectorItem) {
    this.router.navigate(["/game/" + game.id + "/play"], {
      state: { ...game, action: undefined }
    })
  }
}
