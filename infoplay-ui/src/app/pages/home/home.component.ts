import { Component } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  wheelItems: WheelSelectorItem[] = []

  constructor(private readonly gameService: GameService) {
    this.gameService.getFavoritesGames().subscribe({
      next: (games: WheelSelectorItem[]) => this.wheelItems = games
    })
  }
}
