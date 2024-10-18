import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

@Component({
  selector: 'app-inline-list-layout',
  templateUrl: './inline-list-layout.component.html',
  styleUrl: './inline-list-layout.component.scss'
})
export class InlineListLayoutComponent {
  @Input()
  menuItems: WheelSelectorItem[] = []

  selectedItem?: WheelSelectorItem

  constructor(private readonly cd: ChangeDetectorRef) { }

  itemSelected(selectedItem: WheelSelectorItem) {
    this.selectedItem = selectedItem
    this.cd.detectChanges()
  }
}
