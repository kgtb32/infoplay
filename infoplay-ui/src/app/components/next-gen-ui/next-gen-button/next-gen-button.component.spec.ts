import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenButtonComponent } from './next-gen-button.component';
import { EventEmitter } from '@angular/core';
import { NextGenModule } from '../../../layouts/next-gen/next-gen.module';

describe('NextGenButtonComponent', () => {
  let component: NextGenButtonComponent;
  let fixture: ComponentFixture<NextGenButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenButtonComponent],
      imports: [
        NextGenModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NextGenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should update the selected state when position changes", () => {
    const positionChangeEvent: EventEmitter<number> = new EventEmitter()
    component.currentPosition = 42
    component.afterPositionChanged(positionChangeEvent)
    positionChangeEvent.next(42)
    expect(component.selected).toBeTrue()
    positionChangeEvent.next(128)
    expect(component.selected).toBeFalse()
  })

  it("should not handle button clicked event", () => {
    expect(component.afterClickedEventChanged(new EventEmitter())).toBeUndefined()
  })
});
