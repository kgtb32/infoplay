import { Component, OnInit } from '@angular/core';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { defaultLoadingMenu } from '../../menus/default-loading-menu';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { CategoryRouterService } from '../../services/navigation/category-router.service';
import { GameService } from '../../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DefaultBack } from '../../menus/default-back';

@Component({
  selector: 'app-games-by-platform',
  templateUrl: './games-by-platform.component.html',
  styleUrl: './games-by-platform.component.scss',
})
export class GamesByPlatformComponent implements OnInit {
  inlineListMetadata: InlineListMetadata = defaultLoadingMenu;

  private readonly defaultBack: WheelSelectorItem = {
    ...DefaultBack,
    action: () => {
      this.router.navigate(['/platforms']);
    },
  };

  constructor(
    private readonly categoryRouterService: CategoryRouterService,
    private readonly gameService: GameService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => this.initInlineListMetadata(params.get('id') ?? ''),
    });
  }

  private initInlineListMetadata(platformId: string) {
    this.inlineListMetadata = {
      items: [],
      letterFiltering: {
        letterSelectedCallback: (letter) =>
          this.gameService
            .getGamesByPlatformAndLetter(platformId, letter)
            .pipe(map((value) => value.map(game => ({ ...game, action: this.playGame.bind(this) }))))
            .pipe(map((value) => [this.defaultBack].concat(value))),
      },
    };
  }

  private playGame(game: WheelSelectorItem) {
    this.router.navigate(["/game/" + game.id + "/play"], {
      state: { ...game, action: undefined }
    })
  }

  categoryChanged(categoryName: string) {
    if (categoryName !== 'Jeux') {
      this.categoryRouterService.categoryChanged(categoryName);
    }
  }
}
