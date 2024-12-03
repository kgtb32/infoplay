import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { provideHttpClient } from '@angular/common/http';
import { NextGenModule } from '../../layouts/next-gen/next-gen.module';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { Router } from '@angular/router';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { CategoryRouterService } from '../../services/navigation/category-router.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let router: Router
  let categoryRouterService: CategoryRouterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [
        NextGenModule,
        InlineListLayoutModule
      ],
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router)
    categoryRouterService = TestBed.inject(CategoryRouterService)

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should route to correct routes when item is clicked", () => {
    const routesAssociations: { [key: number]: string } = {
      0: '/settings/wifi',
      1: '/settings/audio',
      2: '/settings/bluetooth'
    }
    const spy = spyOn(router, "navigate")
    Object.entries(routesAssociations).forEach(([key, route]) => {
      const id = Number.parseInt(key)
      component.itemClicked({ id } as WheelSelectorItem)
      expect(spy).toHaveBeenCalledWith([route])
    })
  })

  it("should handle category change", () => {
    const spy = spyOn(categoryRouterService, "categoryChanged")
    component.categoryChanged("test")
    expect(spy).toHaveBeenCalledOnceWith("test")
  })
});
