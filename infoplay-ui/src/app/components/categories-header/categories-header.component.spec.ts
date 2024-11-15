import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { JoypadService } from '../../services/joypad.service';
import { CategoriesHeaderComponent } from './categories-header.component';

describe('CategoriesHeaderComponent', () => {
  let component: CategoriesHeaderComponent;
  let fixture: ComponentFixture<CategoriesHeaderComponent>;

  let joypadService: JoypadService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesHeaderComponent]
    })
      .compileComponents();
    jasmine.clock().install()
    jasmine.clock().mockDate(new Date("2022-01-01T00:00:00"))
    joypadService = TestBed.inject(JoypadService)
    fixture = TestBed.createComponent(CategoriesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should update selected value", () => {
    component.itemSelected.subscribe({
      next: (selectedCategory: string) => expect(selectedCategory).toBe("Paramètres")
    })
    component.selected = 2
    expect(component._selected).toBe(2)
  })

  it("should periodically update date", () => {
    const oldDate = component.date
    jasmine.clock().mockDate(new Date("2022-01-01T10:00:00"))
    jasmine.clock().tick(1001)
    jasmine.clock().uninstall()
    expect(component.date).not.toEqual(oldDate)
    expect(component.date).toEqual("10:00")
  })

  it("should move when joystick button is pressed", fakeAsync(() => {
    joypadService.buttonPressEvent.next({
      buttonName: 'button_7',
    } as ButtonPressedDetails)
    tick(1)
    expect(component._selected).toBe(1)
    Array(2).fill(0).forEach(() => {
      joypadService.buttonPressEvent.next({
        buttonName: 'button_6',
      } as ButtonPressedDetails)
    })
    tick(1)
    expect(component._selected).toBe(0)
    component._selected = component.categories.length - 1
    Array(2).fill(0).forEach(() => {
      joypadService.buttonPressEvent.next({
        buttonName: 'button_7',
      } as ButtonPressedDetails)
    })
    expect(component._selected).toBe(component.categories.length - 1)
  }))
});
