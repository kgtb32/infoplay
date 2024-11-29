import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenSliderComponent } from './next-gen-slider.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { JoypadService } from '../../../services/joypad.service';
import { ButtonPressedDetails } from '../../../models/core/joypad/joypad-connect-event';
import { EventEmitter } from '@angular/core';

describe('NextGenSliderComponent', () => {
  let component: NextGenSliderComponent;
  let fixture: ComponentFixture<NextGenSliderComponent>;

  let joypadService: JoypadService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenSliderComponent],
      imports: [
        NgIconsModule
      ],
      providers: [
        provideIcons({})
      ]
    })
      .compileComponents();
    jasmine.clock().install()
    joypadService = TestBed.inject(JoypadService)
    fixture = TestBed.createComponent(NextGenSliderComponent);
    component = fixture.componentInstance;
    component.maxValue = 100
    component.step = 10
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should get stepsQuantity", () => {
    component.maxValue = 100
    component.step = 10
    expect(component.stepsQuantity).toEqual(100 / 10)
  })

  const step200Ahead = () => jasmine.clock().mockDate(new Date(new Date().getTime() + 201))

  it("should handle axis movement", () => {
    component.value = 10
    step200Ahead()
    joypadService.axisMoveEvent.next({ directionOfMovement: 'left' } as ButtonPressedDetails)
    expect(component.value).toBe(10)
    component.selected = true
    step200Ahead()
    joypadService.axisMoveEvent.next({ directionOfMovement: 'left' } as ButtonPressedDetails)
    expect(component.value).toBe(0)
    step200Ahead()
    joypadService.axisMoveEvent.next({ directionOfMovement: 'left' } as ButtonPressedDetails)
    expect(component.value).toBe(0)
    step200Ahead()
    joypadService.axisMoveEvent.next({ directionOfMovement: 'right' } as ButtonPressedDetails)
    expect(component.value).toBe(10)
    component.value = 100
    joypadService.axisMoveEvent.next({ directionOfMovement: 'right' } as ButtonPressedDetails)
    expect(component.value).toBe(100)
  })

  it("should handle position changes", () => {
    const positionChangeEvent: EventEmitter<number> = new EventEmitter()
    component.currentPosition = 42
    component.afterPositionChanged(positionChangeEvent)
    positionChangeEvent.next(42)
    expect(component.selected).toBeTrue()
    positionChangeEvent.next(128)
    expect(component.selected).toBeFalse()
  })

  it("should not handle click event", () => {
    expect(component.afterClickedEventChanged(new EventEmitter())).toBeUndefined()
  })
});
