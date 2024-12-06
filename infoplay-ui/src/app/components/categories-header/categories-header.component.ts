import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import dayjs from 'dayjs'
import { JoypadService } from '../../services/joypad.service';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories-header',
  templateUrl: './categories-header.component.html',
  styleUrl: './categories-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesHeaderComponent implements OnDestroy, OnInit {

  private static readonly LEFT_TRIGGER = "button_6"
  private static readonly RIGHT_TRIGGER = "button_7"

  @Input()
  categories: string[] = [
    "Favoris",
    "Jeux",
    "Paramètres",
    "Applications",
    "Playlists"
  ]

  _selected: number = 0

  @Input()
  set selected(val: number) {
    this._selected = val
    this.cd.detectChanges()
    this.itemSelected.next(this.categories[this._selected])
  }

  @Output()
  itemSelected: EventEmitter<string> = new EventEmitter();

  date: string = this.currentDate

  get currentDate() {
    return dayjs().format("HH:mm")
  }

  interval = setInterval(() => this.date = this.currentDate, 1000)

  constructor(readonly joypadService: JoypadService, private readonly cd: ChangeDetectorRef) {
    joypadService.buttonPressEvent
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (event: ButtonPressedDetails) => this.buttonPressed(event)
      })
  }

  ngOnInit(): void {
    this.itemSelected.next(this.categories[this._selected])
  }

  private buttonPressed(event: ButtonPressedDetails) {
    if (event.buttonName == CategoriesHeaderComponent.LEFT_TRIGGER && this._selected > 0)
      this.selected = this._selected - 1
    else if (event.buttonName == CategoriesHeaderComponent.RIGHT_TRIGGER && this._selected < this.categories.length - 1)
      this.selected = this._selected + 1
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
