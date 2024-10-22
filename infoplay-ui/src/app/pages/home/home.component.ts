import { Component } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { GameService } from '../../services/game.service';
import { JoypadService } from '../../services/joypad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  wheelItems: WheelSelectorItem[] = []

  constructor(private readonly gameService: GameService, private readonly joypadService: JoypadService) {
    this.gameService.getFavoritesGames().subscribe({
      next: (games: WheelSelectorItem[]) => this.wheelItems = games
    })
  }

  public itemClicked(item: WheelSelectorItem) {
    this.gameService.playGame(item.id).subscribe({
      next: () => this.joypadService.joypadEnabled = true
    })
  }
}
