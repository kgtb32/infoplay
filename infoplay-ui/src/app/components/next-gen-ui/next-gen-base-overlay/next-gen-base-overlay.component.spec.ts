import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenBaseOverlayComponent } from './next-gen-base-overlay.component';

describe('NextGenBaseOverlayComponent', () => {
  let component: NextGenBaseOverlayComponent;
  let fixture: ComponentFixture<NextGenBaseOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenBaseOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextGenBaseOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
