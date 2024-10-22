import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  wheelItems: WheelSelectorItem[] = []

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router
  ) {
    this.gameService.getFavoritesGames().subscribe({
      next: (games: WheelSelectorItem[]) => this.wheelItems = games
    })
  }

  public itemClicked(item: WheelSelectorItem) {
    this.router.navigate(["/game/" + item.id + "/play"], {
      state: item
    })
  }
}
