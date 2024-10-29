import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';
import { GameService } from '../../game.service';
import { MenuStateService } from '../menu-state.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public static readonly ID = "favorites-games"

  constructor(
    private readonly menuStateService: MenuStateService,
    private readonly gameService: GameService,
    private readonly router: Router
  ) {
    this.menuStateService.menuOpenedFiltered(FavoritesService.ID)
      .subscribe({
        next: () => this.favorites()
      })
  }

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
