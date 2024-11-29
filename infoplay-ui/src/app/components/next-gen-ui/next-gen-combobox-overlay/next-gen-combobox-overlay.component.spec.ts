import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenComboboxOverlayComponent } from './next-gen-combobox-overlay.component';
import { NextGenModule } from '../../../layouts/next-gen/next-gen.module';
import { JoypadService } from '../../../services/joypad.service';
import { ButtonPressedDetails } from '../../../models/core/joypad/joypad-connect-event';

describe('NextGenComboboxOverlayComponent', () => {
  let component: NextGenComboboxOverlayComponent;
  let fixture: ComponentFixture<NextGenComboboxOverlayComponent>;

  let joypadService: JoypadService

  beforeEach(async () => {
    jasmine.clock().install()
    await TestBed.configureTestingModule({
      declarations: [NextGenComboboxOverlayComponent],
      imports: [
        NextGenModule
      ]
    })
      .compileComponents();
    joypadService = TestBed.inject(JoypadService)
    fixture = TestBed.createComponent(NextGenComboboxOverlayComponent);
    component = fixture.componentInstance;
    component.items = {}
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should handle axis move event trigger", () => {
    const spy = spyOn(component, "axisMoved")
    joypadService.restricForId(NextGenComboboxOverlayComponent.JOYPAD_SCENE_ID)
    joypadService.axisMoveEvent.next({ directionOfMovement: 'top' } as ButtonPressedDetails)
    expect(spy).toHaveBeenCalledWith('top')
  })

  it("should handle button click trigger", () => {
    component.items = {
      tutu: 'tata',
      titi: 'toto',
      fifi: 'fata'
    }
    component.itemSelected.subscribe({
      next: (selectedItem: string) => expect(selectedItem).toEqual('tutu')
    })
    joypadService.restricForId(NextGenComboboxOverlayComponent.JOYPAD_SCENE_ID)
    joypadService.buttonPressEvent.next({ buttonName: 'button_0' } as ButtonPressedDetails)

  })

  it("should tell is threeshold is passed", () => {
    expect(component.isThreesholdPassed).toBeFalse()
    jasmine.clock().mockDate(new Date(new Date().getTime() + 201))
    expect(component.isThreesholdPassed).toBeTrue()
  })

  it("should handle axis movement", () => {
    const threesholdSpy = spyOnProperty(component, "isThreesholdPassed").and.returnValue(false)
    component.items = {
      toto: 'titi',
      tutu: 'tata',
      fafa: 'fifi'
    }
    component.current = 0
    component.axisMoved('top')
    expect(component.current).toBe(0)
    component.current = 2
    component.axisMoved('bottom')
    expect(component.current).toBe(2)
    component.current = 1
    component.axisMoved('bottom')
    expect(component.current).toBe(1)
    threesholdSpy.and.returnValue(true)
    component.axisMoved('bottom')
    expect(component.current).toBe(2)
    component.axisMoved('top')
    expect(component.current).toBe(1)
  })

  it("should get entries in key/value format", () => {
    const comboboxValues = {
      toto: 'titi',
      tutu: 'tata',
      fafa: 'fifi',
    };
    component.items = comboboxValues;
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
  })
});
