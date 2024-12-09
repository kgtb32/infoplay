import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { JoypadService } from '../../services/joypad.service';
import { nanoid } from 'nanoid';
import { filter } from 'rxjs';

@Component({
  selector: 'app-inline-list-layout',
  templateUrl: './inline-list-layout.component.html',
  styleUrl: './inline-list-layout.component.scss'
})
export class InlineListLayoutComponent {
  private static readonly SCENE_ID = nanoid(16)
  private static readonly Y_BUTTON = "button_3"

  @Input()
  set metadata(metadata: InlineListMetadata | undefined) {
    this._metadata = metadata
    this.selectedItem = undefined
  }

  _metadata?: InlineListMetadata

  @Output()
  itemClicked: EventEmitter<WheelSelectorItem> = new EventEmitter();

  @Output()
  favoriteToggle: EventEmitter<WheelSelectorItem> = new EventEmitter()

  @Output()
  categoryChanged: EventEmitter<string> = new EventEmitter()

  @Input()
  selectedCategory: number = 0

  selectedItem?: WheelSelectorItem

  constructor(
    private readonly cd: ChangeDetectorRef,
    readonly joypadService: JoypadService
  ) {
    joypadService.buttonPressEventFiltered(InlineListLayoutComponent.SCENE_ID)
      .pipe(filter(({ buttonName }) => buttonName == InlineListLayoutComponent.Y_BUTTON && !!this.selectedItem))
      .subscribe({
        next: () => this.favoriteToggle.next(this.selectedItem!)
      })
  }

  itemSelected(selectedItem: WheelSelectorItem) {
    this.selectedItem = selectedItem
    this.cd.detectChanges()
  }
}
