import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { GameService } from '../../services/game.service';
import { settingsMenu } from '../../menus/settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  wheelItems: WheelSelectorItem[] = []

  private readonly categoriesPages: { [key: string]: () => void } = {
    "Favoris": () => this.favorites(),
    "Paramètres": () => (this.wheelItems = settingsMenu.map(menuEntry => ({ ...menuEntry, action: () => alert("clicked !") })))
  }

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {
  }

  private favorites() {
    this.wheelItems = []
    this.gameService.getFavoritesGames().subscribe({
      next: (games: WheelSelectorItem[]) => this.wheelItems = games.map(game => ({ ...game, action: this.playGame.bind(this) }))
    })
  }

  public itemClicked(item: WheelSelectorItem) {
    return item.action?.(item)
  }

  public categoryChanged(category: string) {
    this.categoriesPages[category]?.()
    this.cd.detectChanges()
  }

  private playGame(item: WheelSelectorItem) {
    this.router.navigate(["/game/" + item.id + "/play"], {
      state: { ...item, action: undefined }
    })
  }
}
