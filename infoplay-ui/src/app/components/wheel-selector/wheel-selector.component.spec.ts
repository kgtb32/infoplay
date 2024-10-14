import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelSelectorComponent } from './wheel-selector.component';

describe('WheelSelectorComponent', () => {
  let component: WheelSelectorComponent;
  let fixture: ComponentFixture<WheelSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WheelSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
