import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

@Component({
  selector: 'app-inline-list-layout',
  templateUrl: './inline-list-layout.component.html',
  styleUrl: './inline-list-layout.component.scss'
})
export class InlineListLayoutComponent {
  @Input()
  menuItems: WheelSelectorItem[] = []

  @Output()
  itemClicked: EventEmitter<WheelSelectorItem> = new EventEmitter();

  @Output()
  categoryChanged: EventEmitter<string> = new EventEmitter()

  selectedItem?: WheelSelectorItem

  constructor(private readonly cd: ChangeDetectorRef) { }

  itemSelected(selectedItem: WheelSelectorItem) {
    this.selectedItem = selectedItem
    this.cd.detectChanges()
  }
}
