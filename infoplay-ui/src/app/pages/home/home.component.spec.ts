import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { MenuService } from '../../services/menu/menu.service';
import { MenuStateService } from '../../services/menu/menu-state.service';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let menuService: MenuService
  let menuStateService: MenuStateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        InlineListLayoutModule
      ]
    })
      .compileComponents();
    menuStateService = TestBed.inject(MenuStateService)
    menuService = TestBed.inject(MenuService)
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should change the inline state metadata", () => {
    const metadata: InlineListMetadata = {
      items: []
    }
    menuStateService.menuChanged.next(metadata)
    expect(component.inlineListState).toEqual(metadata)
  })

  it("should run the item action when item is clicked", () => {
    const spy = jasmine.createSpy()
    const item: WheelSelectorItem = {
      id: 1,
      name: "Test Item",
      action: () => spy()
    }
    component.itemClicked(item)
    expect(spy).toHaveBeenCalled()
  })

  it("should notify the menu service on category change", () => {
    const spy = spyOn(menuService, "categoryChanged")
    component.categoryChanged("fake")
    expect(spy).toHaveBeenCalledWith("fake")
  })
});
