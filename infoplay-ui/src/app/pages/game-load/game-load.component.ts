import { Component, OnInit } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { JoypadService } from '../../services/joypad.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-game-load',
  templateUrl: './game-load.component.html',
  styleUrl: './game-load.component.scss'
})
export class GameLoadComponent implements OnInit {

  private static readonly GAME_LAUNCH_DELAY = 5000;

  game?: WheelSelectorItem

  constructor(
    private readonly router: Router,
    private readonly gameService: GameService,
    private readonly joypadService: JoypadService
  ) {
    this.game = <WheelSelectorItem | undefined>this.router.getCurrentNavigation()?.extras?.state
    if (!this.game) {
      this.back()
    }
  }

  private back() {
    this.router.navigate(["/"])
    this.joypadService.joypadEnabled = true

  }

  ngOnInit(): void {
    this.joypadService.joypadEnabled = false
    setTimeout(() => {
      this.gameService.playGame(this.game!.id)
        .pipe(tap(() => this.back()))
        .subscribe()
    }, GameLoadComponent.GAME_LAUNCH_DELAY)
  }

  getImage(item: WheelSelectorItem) {
    return `/static/${item.image}`
  }
}
