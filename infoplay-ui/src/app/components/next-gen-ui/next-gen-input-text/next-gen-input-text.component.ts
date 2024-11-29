import { ChangeDetectorRef, Component, EventEmitter, Input } from '@angular/core';
import { filter } from 'rxjs';
import { JoypadService } from '../../../services/joypad.service';
import { VirtualKeyboardComponent } from '../../virtual-keyboard/virtual-keyboard.component';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';

@Component({
  selector: 'app-next-gen-input-text',
  templateUrl: './next-gen-input-text.component.html',
  styleUrl: './next-gen-input-text.component.scss'
})
export class NextGenInputTextComponent extends NextGenBaseComponent {

  displayModal: boolean = false

  readonly iconsAssociation: { [key: string]: string } = {
    number: 'tablerNumber123',
    text: 'tablerInputAi',
    password: 'tablerLockPassword'
  }

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly joypadService: JoypadService
  ) {
    super()
  }

  selected: boolean = false

  @Input()
  type: 'number' | 'text' | 'password' = 'text'

  _text: string = ""

  @Input()
  set text(text: string) {
    this._text = text
  }

  get text() {
    return this.type == 'password' ? this._text.replaceAll(/./g, '*') : this._text
  }

  override afterPositionChanged(positionChanged: EventEmitter<number>): void {
    positionChanged.subscribe({
      next: (value: number) => {
        this.selected = value === this.currentPosition
        this.cd.detectChanges()
      }
    })
  }

  override afterClickedEventChanged(clickedEvent: EventEmitter<void>): void {
    clickedEvent.asObservable()
      .pipe(filter(() => this.selected))
      .subscribe({
        next: () => {
          this.displayModal = true
          this.joypadService.restricForId(VirtualKeyboardComponent.JOYPAD_SCENE_ID)
          this.cd.detectChanges()
        }
      })
  }

  closed(newText?: string) {
    this.joypadService.allowAll()
    if (newText !== undefined) {
      this.text = newText!
    }
    this.displayModal = false
    this.cd.detectChanges()
  }
}
