import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineListLayoutComponent } from './inline-list-layout.component';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { CategoriesHeaderModule } from '../../components/categories-header/categories-header.module';
import { GameDescriptionModule } from '../../components/game-description/game-description.module';

describe('InlineListLayoutComponent', () => {
  let component: InlineListLayoutComponent;
  let fixture: ComponentFixture<InlineListLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineListLayoutComponent],
      imports: [
        CategoriesHeaderModule,
        GameDescriptionModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InlineListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should update metadata", () => {
    const metadata: InlineListMetadata = {
      items: []
    }
    component.selectedItem = {} as WheelSelectorItem
    component.metadata = metadata
    expect(component._metadata).toEqual(metadata)
    expect(component.selectedItem).toBeUndefined()
    component.selectedItem = {} as WheelSelectorItem
    component.metadata = undefined
    expect(component._metadata).toBeUndefined()
    expect(component.selectedItem).toBeUndefined()
  })

  it("should update the selected item", () => {
    const item: WheelSelectorItem = {
      id: 0,
      name: 'fake'
    }
    component.itemSelected(item)
    expect(component.selectedItem).toEqual(item)
  })
});
