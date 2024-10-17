import { Component, Input } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrl: './game-description.component.scss'
})
export class GameDescriptionComponent {
  @Input() game!: WheelSelectorItem
}
