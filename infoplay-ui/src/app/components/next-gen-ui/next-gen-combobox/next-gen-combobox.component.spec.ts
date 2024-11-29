import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenComboboxComponent } from './next-gen-combobox.component';
import { NextGenModule } from '../../../layouts/next-gen/next-gen.module';
import { EventEmitter } from '@angular/core';
import { JoypadService } from '../../../services/joypad.service';
import { NextGenComboboxOverlayComponent } from '../next-gen-combobox-overlay/next-gen-combobox-overlay.component';

describe('NextGenComboboxComponent', () => {
  let component: NextGenComboboxComponent;
  let fixture: ComponentFixture<NextGenComboboxComponent>;

  let joypadService: JoypadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenComboboxComponent],
      imports: [NextGenModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NextGenComboboxComponent);
    joypadService = TestBed.inject(JoypadService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle position changes', () => {
    const positionChangeEvent: EventEmitter<number> = new EventEmitter();
    component.currentPosition = 42;
    component.afterPositionChanged(positionChangeEvent);
    positionChangeEvent.next(42);
    expect(component.selected).toBeTrue();
    positionChangeEvent.next(128);
    expect(component.selected).toBeFalse();
  });

  it('should handle click event', () => {
    component.selected = false;
    component.displayModal = false;
    const clickEvent: EventEmitter<void> = new EventEmitter();
    component.afterClickedEventChanged(clickEvent);
    clickEvent.next();
    expect(component.displayModal).toBeFalse();
    component.selected = true;
    clickEvent.next();
    expect(component.displayModal).toBeTrue();
    expect(joypadService.currentEnabledIds).toEqual([
      NextGenComboboxOverlayComponent.JOYPAD_SCENE_ID,
    ]);
  });

  it('should set combobox values', () => {
    component.items = {}
    expect(component.selectedValue).toEqual("")
    const comboboxValues = {
      toto: 'titi',
      tutu: 'tata',
      fafa: 'fifi',
    };
    component.items = comboboxValues;
    expect(component._items).toEqual(comboboxValues);
    expect(component.entries).toEqual([
      {
        key: 'toto',
        value: 'titi',
      },
      {
        key: 'tutu',
        value: 'tata',
      },
      {
        key: 'fafa',
        value: 'fifi',
      },
    ]);
    expect(component.selectedValue).toEqual("toto")
  });

  it("should handle combobox value change callback", () => {
    component.displayModal = true
    component.itemSelected.subscribe({
      next: (selectedItem: string) => expect(selectedItem).toEqual("titi")
    })
    component.comboboxValueSelected("titi")
    expect(component.displayModal).toBeFalse()
    expect(joypadService.currentEnabledIds).toEqual([])
    expect(component.selectedValue).toEqual("titi")
  })
});
