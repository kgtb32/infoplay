import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DefaultBack } from '../../../menus/default-back';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';
import { MenuOpenState } from '../../../models/core/state/menu-open-state';
import { GameService } from '../../game.service';
import { MenuStateService } from '../menu-state.service';
import { GameConsolesMenuService } from './game-consoles-menu.service';

@Injectable({
  providedIn: 'root'
})
export class GameByPlatformMenuService {
  public static readonly ID = "game-by-platform-menu";
  public static readonly PLATFORM_ID_KEY = "platformId";

  private readonly backMenu: WheelSelectorItem[] = [
    {
      ...DefaultBack,
      action: () => this.menuStateService.menuOpen.next({ menuId: GameConsolesMenuService.ID }),
    }
  ]

  private readonly letterFilteringConfiguration = {
    letterSelectedCallback: (letter: string) => {
      return this.gameService
        .getGamesByPlatformAndLetter(this.platformName, letter)
        .pipe(map(games => this.backMenu.concat(
          games.map(game => ({ ...game, action: () => this.playGame(game) }))
        )))
    },
  }

  private platformName: string = ""

  constructor(
    private readonly menuStateService: MenuStateService,
    private readonly gameService: GameService,
    private readonly router: Router
  ) {
    this.menuStateService.menuOpenedFiltered(GameByPlatformMenuService.ID).subscribe({
      next: state => this.gameByPlatformMenu(state)
    })
  }

  private gameByPlatformMenu(state: MenuOpenState) {
    this.platformName = state?.extraData?.[GameByPlatformMenuService.PLATFORM_ID_KEY] ?? ''
    this.menuStateService.menuChanged.next({
      items: this.backMenu,
      letterFiltering: this.letterFilteringConfiguration
    })
  }

  private playGame(game: WheelSelectorItem) {
    this.router.navigate(["/game/" + game.id + "/play"], {
      state: { ...game, action: undefined }
    })
  }
}
