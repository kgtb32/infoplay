import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenCheckboxComponent } from './next-gen-checkbox.component';
import { NextGenModule } from '../../../layouts/next-gen/next-gen.module';
import { EventEmitter } from '@angular/core';

describe('NextGenCheckboxComponent', () => {
  let component: NextGenCheckboxComponent;
  let fixture: ComponentFixture<NextGenCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenCheckboxComponent],
      imports: [
        NextGenModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NextGenCheckboxComponent);
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

  it("should handle click event", () => {
    component.selected = true
    component.checked = false
    component.checkedStateChanged.subscribe({
      next: (checked: boolean) => expect(component._checked).toEqual(checked)
    })
    const clickEvent: EventEmitter<void> = new EventEmitter()
    component.afterClickedEventChanged(clickEvent)
    clickEvent.next()
    expect(component._checked).toBeTrue()
    clickEvent.next()
    expect(component._checked).toBeFalse()
    component.selected = false
    clickEvent.next()
    expect(component._checked).toBeFalse()
  })
});
