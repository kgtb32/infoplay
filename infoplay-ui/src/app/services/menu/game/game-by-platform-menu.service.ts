import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultBack } from '../../../menus/default-back';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';
import { GameService } from '../../game.service';
import { MenuStateService } from '../menu-state.service';
import { GameConsolesMenuService } from './game-consoles-menu.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameByPlatformMenuService {
  public static readonly ID = "game-by-platform-menu";
  public static readonly PLATFORM_ID_KEY = "platformId";

  constructor(
    private readonly menuStateService: MenuStateService,
    private readonly gameService: GameService,
    private readonly router: Router
  ) {
    this.menuStateService.menuOpenedFiltered(GameByPlatformMenuService.ID).subscribe({
      next: state => this.gameByPlatformMenu(state?.extraData?.[GameByPlatformMenuService.PLATFORM_ID_KEY] ?? '')
    })
  }

  private gameByPlatformMenu(platformId: string) {
    this.gameService.getGamesByPlatform(platformId)
      .subscribe({
        next: (games: WheelSelectorItem[]) => this.gamesRetrieven(games)
      })
  }

  private gamesRetrieven(games: WheelSelectorItem[]) {
    const backMenu: WheelSelectorItem[] = [
      {
        ...DefaultBack,
        action: () => this.menuStateService.menuOpen.next({ menuId: GameConsolesMenuService.ID }),
      }
    ]
    this.menuStateService.menuChanged.next({
      letterFiltering: {
        letterSelectedCallback: (letter) => {
          alert("letter selected: " + letter)
          return of([])
        },
      },
      items: backMenu.concat(
        games.map(game => ({ ...game, action: () => this.playGame(game) }))
      )
    })
  }

  private playGame(game: WheelSelectorItem) {
    this.router.navigate(["/game/" + game.id + "/play"], {
      state: { ...game, action: undefined }
    })
  }
}
