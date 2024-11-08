import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LEFT_STICK, LetterFilterComponent, LETTERS, RIGHT_STICK } from './letter-filter.component';
import { JoypadService } from '../../services/joypad.service';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { of } from 'rxjs';
import { MenuStateService } from '../../services/menu/menu-state.service';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

const basicMetadata: InlineListMetadata = {
  items: [
    { id: 0, name: "Item 1" },
    { id: 0, name: "Item 2" },
  ]
}

const complexierMetadata: InlineListMetadata = {
  items: [],
  letterFiltering: {
    letterSelectedCallback(letter) {
      return of(Array(LETTERS.indexOf(letter)).fill(basicMetadata.items[0]))
    },
  }
}

describe('LetterFilterComponent', () => {
  let component: LetterFilterComponent;
  let fixture: ComponentFixture<LetterFilterComponent>;

  let joypadService: JoypadService
  let menuStateService: MenuStateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterFilterComponent]
    })
      .compileComponents();
    joypadService = TestBed.inject(JoypadService)
    menuStateService = TestBed.inject(MenuStateService)
    fixture = TestBed.createComponent(LetterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call buttonPressed when left or right stick is pressed", fakeAsync(() => {
    const spy = spyOn(component, "buttonPressed");
    [LEFT_STICK, RIGHT_STICK].forEach((button: string) => {
      joypadService.buttonPressEvent.next({ buttonName: button } as ButtonPressedDetails)
      tick(1)
      expect(spy).toHaveBeenCalledWith(button)
    })
    joypadService.buttonPressEvent.next({ buttonName: "another_button" } as ButtonPressedDetails)
    tick(1)
    expect(spy).not.toHaveBeenCalledWith('another_button')
  }))

  it("should handle button index changes on button press", () => {
    component.buttonPressed(RIGHT_STICK)
    expect(component.letter).toBe(LETTERS[1]);
    Array(2).fill(0).forEach(() => {
      component.buttonPressed(LEFT_STICK)
      expect(component.letter).toBe(LETTERS[0])
    })
    Array(LETTERS.length).fill(0).forEach(() => component.buttonPressed(RIGHT_STICK))
    component.buttonPressed(RIGHT_STICK)
    expect(component.letter).toBe(LETTERS[LETTERS.length - 1]);
  })

  it("should return the letters list", () => {
    expect(component.letters).toEqual(LETTERS.split(""));
  })

  it("should set metadata and populate entries by letter (basic metadata case)", () => {
    component.buttonPressed(LEFT_STICK)
    component.metadata = basicMetadata
    expect(component._metadata).toBe(basicMetadata)
    expect(component.letter).toBe(LETTERS[0]);
  })

  it("should set metadata and populate entries by letter (complex metadata case)", fakeAsync(() => {
    component.buttonPressed(LEFT_STICK)
    const spy = spyOn(component, "buttonPressed");
    menuStateService.directMenuChanged.subscribe({
      next: (items: WheelSelectorItem[]) => expect(items.length).toBe(1)
    })
    component.metadata = complexierMetadata
    tick(1)
    expect(spy).toHaveBeenCalledWith(LEFT_STICK)
    expect(component.letter).toBe(LETTERS[0]);
  }))
});
