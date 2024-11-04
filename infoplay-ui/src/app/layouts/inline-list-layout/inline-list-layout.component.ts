import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';

@Component({
  selector: 'app-inline-list-layout',
  templateUrl: './inline-list-layout.component.html',
  styleUrl: './inline-list-layout.component.scss'
})
export class InlineListLayoutComponent {
  @Input()
  set metadata(metadata: InlineListMetadata | undefined) {
    this._metadata = metadata
    this.selectedItem = undefined
  }

  _metadata?: InlineListMetadata

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
