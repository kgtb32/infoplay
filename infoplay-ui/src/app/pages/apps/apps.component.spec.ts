import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsComponent } from './apps.component';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { provideHttpClient } from '@angular/common/http';
import { CategoryRouterService } from '../../services/navigation/category-router.service';
import { Router } from '@angular/router';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

describe('AppsComponent', () => {
  let component: AppsComponent;
  let fixture: ComponentFixture<AppsComponent>;

  let categoryRouterService: CategoryRouterService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppsComponent],
      imports: [
        InlineListLayoutModule
      ],
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();
    spyOn(window, "clearInterval").and.callFake(() => void 0)
    categoryRouterService = TestBed.inject(CategoryRouterService)
    router = TestBed.inject(Router)

    fixture = TestBed.createComponent(AppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should handle category change", () => {
    const spy = spyOn(categoryRouterService, "categoryChanged")
    component.categoryChanged("test")
    expect(spy).toHaveBeenCalledWith("test")
  })

  it("should navigate to expected routes", () => {
    const routes: { [key: number]: string } = {
      0: '/apps/webradio',
      1: '/apps/weather',
      2: '/apps/media'
    }
    const spy = spyOn(router, "navigate")
    Object.entries(routes).forEach(([key, route]) => {
      const id = Number.parseInt(key)
      component.itemClicked({ id } as WheelSelectorItem)
      expect(spy).toHaveBeenCalledWith([route])
    })
  })
});
