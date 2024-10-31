import { Injectable } from '@angular/core';
import { MenuStateService } from '../menu-state.service';
import { GameService } from '../../game.service';
import { mapPlatformToWheelSelector } from '../../mappers/platform-mapper';

@Injectable({
  providedIn: 'root'
})
export class GameConsolesMenuService {
  public static readonly ID = "game-consoles-menu"

  constructor(
    private readonly menuStateService: MenuStateService,
    private readonly gameService: GameService
  ) {
    this.menuStateService.menuOpenedFiltered(GameConsolesMenuService.ID).subscribe({
      next: () => this.consoleMenu()
    })
  }

  private consoleMenu() {
    this.menuStateService.menuChanged.next([])
    this.gameService.getPlatforms().subscribe({
      next: platforms => this.menuStateService.menuChanged.next(
        platforms.map((platform, i) => (
          { ...mapPlatformToWheelSelector(platform, i), action: () => this.platformClicked(platform.name) }
        ))
      )
    })
  }

  private platformClicked(name: string) {
    alert(name + "clicked")
  }
}
