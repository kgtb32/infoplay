import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom, tap } from 'rxjs';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { JoypadService } from '../../services/joypad.service';
import { MenuStateService } from '../../services/menu/menu-state.service';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0#";
const LEFT_STICK = "button_4"
const RIGHT_STICK = "button_5"

const FIRST_LETTER_LOAD = 0

@Component({
  selector: 'app-letter-filter',
  templateUrl: './letter-filter.component.html',
  styleUrl: './letter-filter.component.scss'
})
export class LetterFilterComponent {
  private selectedIndex: number = 0

  private letterItems: { [key: string]: WheelSelectorItem[] } = {}

  constructor(
    private readonly joypadService: JoypadService,
    private readonly cd: ChangeDetectorRef,
    private readonly menuStateService: MenuStateService
  ) {
    this.joypadService.buttonPressEvent
      .pipe(takeUntilDestroyed())
      .pipe(filter(btn => [LEFT_STICK, RIGHT_STICK].includes(btn.buttonName)))
      .subscribe({
        next: event => this.buttonPressed(event.buttonName)
      })
  }

  buttonPressed(buttonName: string) {
    if (buttonName === LEFT_STICK && this.selectedIndex > 0) {
      this.selectedIndex--
    }
    else if (buttonName === RIGHT_STICK && this.selectedIndex < this.letters.length - 1) {
      this.selectedIndex++
    }
    this.menuStateService.directMenuChanged.next(
      this.letterItems[this.letters[this.selectedIndex]]
    )
    this.cd.detectChanges()
  }

  @Input()
  set metadata(metadata: InlineListMetadata) {
    this._metadata = metadata
    this.selectedIndex = 0
    const promises = this.letters.map(letter => firstValueFrom(
      this._metadata.letterFiltering!.letterSelectedCallback(letter)
        .pipe(tap(items => this.letterItems[letter] = items))
    ))
    promises[FIRST_LETTER_LOAD].then(() => this.buttonPressed(LEFT_STICK))
  }

  _metadata!: InlineListMetadata

  get letter() {
    return this.letters[this.selectedIndex]
  }

  get letters(): string[] {
    return LETTERS.split("")
  }
}
