import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { JoypadService } from '../../services/joypad.service';
import { MenuStateService } from '../../services/menu/menu-state.service';
import { LEFT_STICK, LetterFilterComponent, LETTERS, RIGHT_STICK } from './letter-filter.component';

const basicMetadata: InlineListMetadata = {
  items: [
    { id: 0, name: "Item 1" },
    { id: 0, name: "Item 2" },
  ]
}

describe('LetterFilterComponent DOM', () => {
  let component: LetterFilterComponent;
  let fixture: ComponentFixture<LetterFilterComponent>;

  let joypadService: JoypadService
  let menuStateService: MenuStateService
  let nativeElement: HTMLElement

  const getLetter = (index: number) => {
    return nativeElement.querySelector(`[data-testid="current_letter_${index}"]`)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterFilterComponent]
    })
      .compileComponents();
    joypadService = TestBed.inject(JoypadService)
    fixture = TestBed.createComponent(LetterFilterComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should update the selected letter on the menu", fakeAsync(() => {
    joypadService.buttonPressEvent.next({ buttonName: RIGHT_STICK } as ButtonPressedDetails)
    tick(1)
    fixture.detectChanges()
    expect(getLetter(1)?.classList.contains('letter-selected')).toBeTrue()
    Array(2).fill(0).forEach(() => {
      joypadService.buttonPressEvent.next({ buttonName: LEFT_STICK } as ButtonPressedDetails)
      tick(1)
      fixture.detectChanges()
      expect(getLetter(0)?.classList.contains('letter-selected')).toBeTrue()
    })
  }))

  it("should render letters correctly", () => {
    LETTERS.substring(0, LETTERS.length - 3).split('').forEach((_, i) => {
      expect(getLetter(i)?.textContent).toEqual(LETTERS[i])
    })
    expect(getLetter(LETTERS.length - 1)?.textContent).toEqual("∞")
    expect(getLetter(LETTERS.length - 2)?.textContent).toEqual("0-9")
  })
});
