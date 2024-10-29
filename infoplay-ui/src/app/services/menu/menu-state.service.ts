import { EventEmitter, Injectable } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {

  public readonly menuChanged: EventEmitter<WheelSelectorItem[]> = new EventEmitter()

  constructor() {
    this.menuChanged.next([])
  }
}
