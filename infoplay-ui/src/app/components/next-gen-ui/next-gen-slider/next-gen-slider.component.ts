import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';
import { JoypadService } from '../../../services/joypad.service';
import { nanoid } from 'nanoid';
import { filter } from 'rxjs';
import { MovementDirection } from '../../../models/core/joypad/joypad-connect-event';

@Component({
  selector: 'app-next-gen-slider',
  templateUrl: './next-gen-slider.component.html',
  styleUrl: './next-gen-slider.component.scss'
})
export class NextGenSliderComponent extends NextGenBaseComponent {
  private static readonly JOYPAD_SCENE_ID = nanoid(16)
  private static readonly THREESHOLD = 200
  private static readonly ALLOWED_MOVEMENTS = ['left', 'right']

  private lastMovement: number = new Date().getTime()

  selected: boolean = false

  @Input()
  maxValue: number = 0

  @Input()
  step: number = 0

  @Input()
  value: number = 0

  @Input()
  text: string = ""

  @Input()
  icon?: string

  @Input()
  valueChanged: EventEmitter<number> = new EventEmitter()

  get stepsQuantity() {
    return Math.floor(this.maxValue / this.step)
  }

  constructor(
    private readonly cd: ChangeDetectorRef,
    readonly joypadService: JoypadService
  ) {
    super()
    joypadService.axisMoveEventFiltered(NextGenSliderComponent.JOYPAD_SCENE_ID)
      .pipe(filter(({ directionOfMovement }) => NextGenSliderComponent.ALLOWED_MOVEMENTS.includes(directionOfMovement) && this.selected))
      .subscribe({
        next: ({ directionOfMovement }) => this.axisMoved(directionOfMovement)
      })
  }

  private axisMoved(directionOfMovement: MovementDirection) {
    if (new Date().getTime() - this.lastMovement < NextGenSliderComponent.THREESHOLD) {
      return
    }
    if (directionOfMovement === 'left' && this.value > 0) {
      this.value = this.value - this.step
    }
    else if (directionOfMovement === 'right' && this.value < this.maxValue) {
      this.value = this.value + this.step
    }
    this.valueChanged.next(this.value)
    this.lastMovement = new Date().getTime()
    this.cd.detectChanges()
  }

  override afterPositionChanged(positionChanged: EventEmitter<number>): void {
    positionChanged.subscribe({
      next: (newPosition: number) => {
        this.selected = newPosition === this.currentPosition
        this.cd.detectChanges()
      }
    })
  }

  override afterClickedEventChanged(_clickedEvent: EventEmitter<void>): void {
    return
  }
}
