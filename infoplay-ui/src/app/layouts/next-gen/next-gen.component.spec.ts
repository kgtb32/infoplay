import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenComponent } from './next-gen.component';
import { EventEmitter } from '@angular/core';
import { NextGenRadioProps, NextgenUiMetadata } from '../../models/core/ui/next-gen-ui-metadata';
import { JoypadService } from '../../services/joypad.service';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';

const metadata: NextgenUiMetadata = {
  components: [
    {
      componentType: 'button',
      props: {
        positionChanged: new EventEmitter(),
        clickedEvent: new EventEmitter(),
        currentPosition: 0
      }
    },
    {
      componentType: 'radio',
      props: <NextGenRadioProps>{
        positionChanged: new EventEmitter(),
        clickedEvent: new EventEmitter(),
        itemSelected: new EventEmitter(),
        currentPosition: 0,
        items: {
          toto: 'titi',
          tata: 'tutu'
        }
      }
    },
    {
      componentType: 'button',
      props: {
        positionChanged: new EventEmitter(),
        clickedEvent: new EventEmitter(),
        currentPosition: 0
      }
    },
  ],
  direction: 'horizontal'
}

describe('NextGenComponent', () => {
  let component: NextGenComponent;
  let fixture: ComponentFixture<NextGenComponent>;

  let joypadService: JoypadService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenComponent]
    })
      .compileComponents();
    jasmine.clock().uninstall()
    jasmine.clock().install()
    joypadService = TestBed.inject(JoypadService)
    fixture = TestBed.createComponent(NextGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => jasmine.clock().uninstall())

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should tell if threeshold has passed", () => {
    expect(component.isThreesholdPassed).toBeFalse()
    jasmine.clock().mockDate(new Date(new Date().getTime() + 351))
    expect(component.isThreesholdPassed).toBeTrue()
  })

  it("should calculate max items", () => {
    component._metadata = metadata
    expect(component.maxItems).toEqual(4)
  })

  it("should set metadata and update positions", () => {
    component.metadata = metadata
    expect(component._metadata!.components[0].props.currentPosition).toEqual(0)
    expect(component._metadata!.components[1].props.currentPosition).toEqual(1)
    expect(component._metadata!.components[2].props.currentPosition).toEqual(3)
  })

  it("should be able to get component", () => {
    component.metadata = metadata
    const foundComponent = component.getComponent(0)
    expect(foundComponent.component).toBeDefined()
    expect(foundComponent.props).toEqual(component._metadata?.components.at(0)?.props as unknown as Record<string, unknown>)
    const invalidComponent = component.getComponent(42)
    expect(invalidComponent.component).toBeUndefined()
    expect(invalidComponent.props).toBeUndefined()
  })

  it("should handle axis movement", () => {
    component.metadata = metadata
    joypadService.axisMoveEvent.next({ directionOfMovement: 'top' } as ButtonPressedDetails)
    expect(component._current).toBe(0)
    component._current = 4
    joypadService.axisMoveEvent.next({ directionOfMovement: 'bottom' } as ButtonPressedDetails)
    expect(component._current).toBe(4)
    component._current = 1
    jasmine.clock().mockDate(new Date(new Date().getTime() + 351))
    joypadService.axisMoveEvent.next({ directionOfMovement: 'top' } as ButtonPressedDetails)
    expect(component._current).toBe(0)
    jasmine.clock().mockDate(new Date(new Date().getTime() + 351))
    joypadService.axisMoveEvent.next({ directionOfMovement: 'bottom' } as ButtonPressedDetails)
    expect(component._current).toBe(1)
    component._metadata = undefined
    component._current = 0
    joypadService.axisMoveEvent.next({ directionOfMovement: 'bottom' } as ButtonPressedDetails)
    expect(component._current).toBe(0)
  })

  it("should proxy click event", () => {
    component.metadata = metadata
    const clickEvent = component._metadata?.components.at(0)?.props.clickedEvent!
    clickEvent.subscribe({
      next: () => expect().nothing()
    })
    joypadService.buttonPressEvent.next({ buttonName: 'button_0' } as ButtonPressedDetails)
  })
});
