import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenRadioComponent } from './next-gen-radio.component';
import { EventEmitter } from '@angular/core';
import { NextGenModule } from '../../../layouts/next-gen/next-gen.module';

describe('NextGenRadioComponent', () => {
  let component: NextGenRadioComponent;
  let fixture: ComponentFixture<NextGenRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenRadioComponent],
      imports: [
        NextGenModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NextGenRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should handle position change", () => {
    const positionChangeEvent: EventEmitter<number> = new EventEmitter()
    component.afterPositionChanged(positionChangeEvent)
    positionChangeEvent.next(42)
    expect(component.actualPosition).toEqual(42)
  })

  it("should handle click event", () => {
    const clickEvent: EventEmitter<void> = new EventEmitter()
    component.items = {
      titi: 'toto',
      tata: 'tutu'
    }
    component.itemSelected.subscribe({
      next: (item: string) => expect(item).toEqual("tata")
    })
    component.afterClickedEventChanged(clickEvent)
    component.actualPosition = 1
    clickEvent.next()
    expect(component.selectedValue).toEqual('tata')
  })

  it("should get entries in key/value format", () => {
    component.items = {}
    expect(component.selectedValue).toEqual('')
    const comboboxValues = {
      toto: 'titi',
      tutu: 'tata',
      fafa: 'fifi',
    };
    component.items = comboboxValues;
    expect(component._items).toEqual(comboboxValues)
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
    expect(component.selectedValue).toEqual('toto')
  })
});
