import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ActionButtonType = 'DEL' | 'CAN' | 'OK'

@Injectable({
  providedIn: 'root'
})
export class VirtualKeyboardService {
  public readonly keyPressed: Subject<string> = new Subject<string>()
  public readonly actionButtonPressed: Subject<ActionButtonType> = new Subject<ActionButtonType>()

  public enabled: boolean = false
}
