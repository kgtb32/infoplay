import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { CategoryRouterService } from '../../services/navigation/category-router.service';
import { defaultLoadingMenu } from '../../menus/default-loading-menu';

@Component({
  selector: 'app-favorites-games',
  templateUrl: './favorites-games.component.html',
  styleUrl: './favorites-games.component.scss',
})
export class FavoritesGamesComponent implements OnInit {
  inlineListMetadata: InlineListMetadata = defaultLoadingMenu

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router,
    private readonly categoryRouterService: CategoryRouterService,
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.gameService.getFavoritesGames().subscribe({
      next: (games: WheelSelectorItem[]) => this.afterGamesReceived(games)
    });
  }

  private afterGamesReceived(games: WheelSelectorItem[]) {
    this.inlineListMetadata = {
      ...this.inlineListMetadata,
      items: games
    }
    this.cd.detectChanges()
  }

  itemClicked(game: WheelSelectorItem) {
    this.router.navigate(["/game/" + game.id + "/play"], {
      state: { ...game, action: undefined }
    })
  }

  favoritesToggle(game: WheelSelectorItem) {
    this.gameService.toggleFavoritesGames(game.id).subscribe({
      next: (games: WheelSelectorItem[]) => this.afterGamesReceived(games)
    })
  }

  categoryChanged(category: string) {
    this.categoryRouterService.categoryChanged(category)
  }
}
