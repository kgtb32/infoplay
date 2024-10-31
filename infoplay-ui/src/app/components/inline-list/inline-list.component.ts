import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { MovementDirection } from '../../models/core/joypad/joypad-connect-event';
import { AudioService } from '../../services/audio.service';
import { JoypadService } from '../../services/joypad.service';
import { getDynamicImageUrl } from '../../utils/image-utils';

@Component({
  selector: 'app-inline-list',
  templateUrl: './inline-list.component.html',
  styleUrl: './inline-list.component.scss'
})
export class InlineListComponent {
  private static readonly THREESHOLD = 200
  private static readonly ANIMATOR_CLASS = "home-list-item-selected"
  private static readonly CONTAINER = "home-list-items-containers"

  private static readonly ALLOWED_MOVEMENTS = ["right", "left"]
  private static readonly X_BUTTON = "button_0"

  private lastMovement: number = new Date().getTime()

  public readonly getImage = getDynamicImageUrl

  @Input()
  set items(items: WheelSelectorItem[]) {
    this._items = items
    if (items.length > 0) {
      this.selectedIndex = 0
      this.itemSelected.next(items[0])
    }
  }

  _items: WheelSelectorItem[] = []

  @Output()
  itemSelected: EventEmitter<WheelSelectorItem> = new EventEmitter()

  @Output()
  itemClicked: EventEmitter<WheelSelectorItem> = new EventEmitter()

  selectedIndex: number = 0

  constructor(
    private readonly joypadService: JoypadService,
    private readonly cd: ChangeDetectorRef,
    private readonly audioService: AudioService,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.joypadService.axisMoveEvent
      .pipe(takeUntilDestroyed())
      .pipe(filter(({ directionOfMovement }) => InlineListComponent.ALLOWED_MOVEMENTS.includes(directionOfMovement)))
      .subscribe({
        next: ({ directionOfMovement }) => this.axisMoved(directionOfMovement)
      })
    this.joypadService.buttonPressEvent
      .pipe(takeUntilDestroyed())
      .pipe(filter(({ buttonName }) => buttonName == InlineListComponent.X_BUTTON))
      .subscribe({
        next: () => this.itemClicked.next(this._items[this.selectedIndex])
      })
  }

  private axisMoved(directionOfMovement: MovementDirection) {
    if (new Date().getTime() - this.lastMovement > InlineListComponent.THREESHOLD) {
      this.lastMovement = new Date().getTime()
      if (directionOfMovement == 'left' && this.selectedIndex > 0) {
        this.selectedIndex--
      }
      else if (directionOfMovement == 'right' && this.selectedIndex < this._items.length - 1) {
        this.selectedIndex++
      }
      this.cd.detectChanges()
      this.animateAndScrollSelectedItem(directionOfMovement)
      this.audioService.select()
      this.itemSelected.next(this._items[this.selectedIndex])
    }
  }

  private animateAndScrollSelectedItem(direction: MovementDirection) {
    const documentElement = this.document.getElementsByClassName(InlineListComponent.ANIMATOR_CLASS)[0]
    const documentElementScroll = this.document.getElementsByClassName(InlineListComponent.CONTAINER)[0]
    const position = direction == 'left' ? documentElementScroll.scrollLeft - documentElement.clientWidth : documentElementScroll.scrollLeft + documentElement.clientWidth
    documentElementScroll.scroll({
      left: position
    })
    documentElement.classList.remove(InlineListComponent.ANIMATOR_CLASS)
    setTimeout(() => {
      documentElement.classList.add(InlineListComponent.ANIMATOR_CLASS)
      documentElementScroll.scroll({
        left: position
      })
    }, 1)
  }
}
