import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import { letters, numbers, specialChars } from '../../models/core/keyboard/layouts/azerty';
import { VirtualKeyboardService } from '../../services/core/virtual-keyboard.service';
import { JoypadService } from '../../services/joypad.service';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';

describe('VirtualKeyboardComponent', () => {
  let component: VirtualKeyboardComponent;
  let fixture: ComponentFixture<VirtualKeyboardComponent>;

  let virtualKeyboardService: VirtualKeyboardService
  let joypadService: JoypadService

  beforeEach(async () => {
    jasmine.clock().install()
    await TestBed.configureTestingModule({
      declarations: [VirtualKeyboardComponent]
    })
      .compileComponents();

    virtualKeyboardService = TestBed.inject(VirtualKeyboardService)
    joypadService = TestBed.inject(JoypadService)
    fixture = TestBed.createComponent(VirtualKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should change current keyboard type", () => {
    component.current = 'numbers'
    expect(component._current).toEqual("numbers")
  })

  it("should return the current keyboard layout", () => {
    expect(component.currentLayout).toEqual(letters)
    component.current = 'numbers'
    expect(component.currentLayout).toEqual(numbers)
    component.current = 'specialChars'
    expect(component.currentLayout).toEqual(specialChars)
  });

  it("should handle (BOTTOM) letter association", () => {
    component.letterClicked('BOT')
    expect(virtualKeyboardService.enabled).toBeFalse()
  })

  it("should handle (MAJ) letter association", () => {
    component.letterClicked('MAJ')
    expect(component.getLetter(0, 0)).toEqual('A')
  })

  it("should change layout", () => {
    component.letterClicked("123")
    expect(component.currentLayout).toEqual(numbers)
    component.letterClicked("ABC")
    expect(component.currentLayout).toEqual(letters)
    component.letterClicked("#+=")
    expect(component.currentLayout).toEqual(specialChars)
  })

  it("should handle (ESP) letter association", () => {
    const spy = spyOn(virtualKeyboardService.keyPressed, 'next')
    component.letterClicked("ESP")
    expect(spy).toHaveBeenCalledWith(" ")
  })

  it("should handle actions buttons", () => {
    const spy = spyOn(virtualKeyboardService.actionButtonPressed, "next")
    component.letterClicked("DEL")
    expect(spy).toHaveBeenCalledWith("DEL")
    component.letterClicked("CAN")
    expect(spy).toHaveBeenCalledWith("CAN")
    component.letterClicked(" OK")
    expect(spy).toHaveBeenCalledWith("OK")
    let index = 0
    const possiblesValues = ['a', 'A']
    virtualKeyboardService.keyPressed.subscribe({
      next: (value: string) => {
        expect(value).toEqual(possiblesValues[index])
        index++
      }
    })
    component.letterClicked('A')
    component.letterClicked("MAJ")
    component.letterClicked('A')
  })

  it("should pad X coordinates", () => {
    component.padX(2)
    expect(component.currentPositions.y).toBe(2)
    component.currentPositions.x = component.currentLayout[2].length - 1
    component.padX(1)
    expect(component.currentPositions.x).toBe(component.currentLayout[1].length - 1)
    component.padX(2)
    expect(component.currentPositions.x).toBe(component.currentLayout[2].length - 1)
  })

  it("should move to bottom while looping", () => {
    component.currentPositions.x = component.currentLayout[0].length - 1
    Array(3).fill(0).forEach((_, i) => {
      component.moveBottom()
      expect(component.currentPositions).toEqual({ x: component.currentLayout[i + 1].length - 1, y: i + 1 })
    })
    component.moveBottom()
    expect(component.currentPositions).toEqual({ x: component.currentLayout[0].length - 1, y: 0 })
  })

  it("should move to top while looping", () => {
    component.currentPositions = { x: component.currentLayout[3].length - 1, y: 3 };
    [3, 2, 1].forEach(i => {
      component.moveTop()
      expect(component.currentPositions).toEqual({ x: component.currentLayout[i - 1].length - 1, y: i - 1 })
    })
    component.moveTop()
    expect(component.currentPositions).toEqual({ x: component.currentLayout[3].length - 1, y: 3 })
  })

  it("should move to the right while looping", () => {
    component.currentPositions = { x: 0, y: 0 };
    Array(component.currentLayout[0].length - 1).fill(0).forEach((_, i) => {
      component.moveRight()
      expect(component.currentPositions).toEqual({ x: i + 1, y: 0 })
    })
    component.moveRight()
    expect(component.currentPositions).toEqual({ x: 0, y: 0 })
  })

  it("should move to the left while looping", () => {
    const max = component.currentLayout[0].length - 1
    component.currentPositions = { x: max, y: 0 };
    Array(max - 1).fill(null).map((_, i) => i + 1).reverse().forEach(i => {
      component.moveLeft()
      expect(component.currentPositions).toEqual({ x: i, y: 0 })
    })
    component.moveLeft()
    expect(component.currentPositions).toEqual({ x: 0, y: 0 })
    component.moveLeft()
    expect(component.currentPositions).toEqual({ x: max, y: 0 })
  })

  it("should handle joypad axis movement", fakeAsync(() => {
    [
      [spyOn(component, 'moveTop'), 'top'],
      [spyOn(component, 'moveBottom'), 'bottom'],
      [spyOn(component, 'moveLeft'), 'left'],
      [spyOn(component, 'moveRight'), 'right'],
    ].forEach(([spy, directionOfMovement]) => {
      jasmine.clock().mockDate(new Date(new Date().getTime() + 300)) //threshold
      joypadService.axisMoveEvent.next({ directionOfMovement } as ButtonPressedDetails)
      tick(1)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  }))

  it("should callback to letter clicked when x button is pressed", fakeAsync(() => {
    const spy = spyOn(component, 'letterClicked')
    joypadService.buttonPressEvent.next({ buttonName: 'button_0' } as ButtonPressedDetails)
    tick(1)
    expect(spy).toHaveBeenCalledWith('A')
  }))
});
