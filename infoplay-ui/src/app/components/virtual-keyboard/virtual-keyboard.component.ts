import { ChangeDetectorRef, Component } from '@angular/core';
import { JoypadService } from '../../services/joypad.service';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { filter } from 'rxjs';
import { lettersAssociations } from '../../models/core/keyboard/keyboard';
import { VirtualKeyboardService } from '../../services/core/virtual-keyboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { letters, numbers, specialChars } from '../../models/core/keyboard/layouts/azerty';
import { CurrentPosition } from '../../models/components/virtual-keyboard/current-position';
import { KeyboardTypes } from '../../models/core/keyboard/keyboard-types';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrl: './virtual-keyboard.component.scss'
})
export class VirtualKeyboardComponent {
  private static readonly THREESHOLD = 300

  public static readonly JOYPAD_SCENE_ID = nanoid(16)

  private readonly joypadDirectionsMapping: { [key: string]: Function } = {
    left: () => this.moveLeft(),
    right: () => this.moveRight(),
    top: () => this.moveTop(),
    bottom: () => this.moveBottom()
  }
  private readonly joypadButtonsMapping: { [key: string]: Function } = {
    button_0: (letter: string) => this.letterClicked(letter)
  }
  private readonly letterActionAssociation: { [key: string]: Function } = {
    BOT: () => this.virtualKeyboardService.enabled = false,
    MAJ: () => this.majuscule = !this.majuscule,
    ABC: () => this.current = 'letters',
    "123": () => this.current = 'numbers',
    "#+=": () => this.current = 'specialChars',
    "ESP": () => this.virtualKeyboardService.keyPressed.next(' '),
    DEL: () => this.virtualKeyboardService.actionButtonPressed.next('DEL'),
    "CAN": () => this.virtualKeyboardService.actionButtonPressed.next('CAN'),
    " OK": () => this.virtualKeyboardService.actionButtonPressed.next('OK'),
  }

  private lastMovement: number = new Date().getTime()
  private majuscule: boolean = false

  _current: KeyboardTypes = 'letters'

  set current(current: KeyboardTypes) {
    this._current = current
  }

  get currentLayout() {
    return {
      letters: letters,
      numbers: numbers,
      specialChars: specialChars
    }[this._current]
  }

  currentPositions: CurrentPosition = { x: 0, y: 0 }

  constructor(
    private readonly joypadService: JoypadService,
    private readonly cd: ChangeDetectorRef,
    private readonly virtualKeyboardService: VirtualKeyboardService
  ) {
    this.joypadService.axisMoveEventFiltered(VirtualKeyboardComponent.JOYPAD_SCENE_ID)
      .pipe(takeUntilDestroyed())
      .pipe(filter(() => new Date().getTime() - this.lastMovement > VirtualKeyboardComponent.THREESHOLD))
      .subscribe((event: ButtonPressedDetails) => {
        this.lastMovement = new Date().getTime()
        this.joypadDirectionsMapping[event.directionOfMovement]()
        this.cd.detectChanges()
      })
    this.joypadService
      .buttonPressEventFiltered(VirtualKeyboardComponent.JOYPAD_SCENE_ID)
      .pipe(takeUntilDestroyed())
      .subscribe((event: ButtonPressedDetails) =>
        this.joypadButtonsMapping?.[event.buttonName]?.(this.currentLayout[this.currentPositions.y][this.currentPositions.x])
      )
  }

  letterClicked(letter: string) {
    if (this.letterActionAssociation?.[letter]) {
      this.letterActionAssociation?.[letter]?.()
    }
    else {
      this.virtualKeyboardService.keyPressed.next(this.majuscule ? letter.toUpperCase() : letter.toLowerCase())
    }
    this.cd.detectChanges()
  }

  getLetter(x: number, y: number) {
    const letter = lettersAssociations[this.currentLayout[y][x]] ?? this.currentLayout[y][x]
    return this.majuscule ? letter.toUpperCase() : letter.toLowerCase()
  }

  padX(newY: number) {
    if (
      this.currentPositions.x < this.currentLayout[newY].length - 1 &&
      this.currentPositions.x == this.currentLayout[this.currentPositions.y].length - 1 ||
      this.currentPositions.x >= this.currentLayout[newY].length - 1
    ) {
      this.currentPositions.x = this.currentLayout[newY].length - 1
    }
    this.currentPositions.y = newY
  }

  moveBottom() {
    this.padX(this.currentPositions.y >= this.currentLayout.length - 1 ? 0 : this.currentPositions.y + 1)
  }

  moveTop() {
    this.padX(this.currentPositions.y == 0 ? this.currentLayout.length - 1 : this.currentPositions.y - 1)
  }

  moveRight() {
    this.currentPositions.x = this.currentPositions.x >= this.currentLayout[this.currentPositions.y].length - 1 ? 0 : this.currentPositions.x + 1
  }

  moveLeft() {
    this.currentPositions.x = this.currentPositions.x == 0 ? this.currentLayout[this.currentPositions.y].length - 1 : this.currentPositions.x - 1
  }
}
