import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenBaseButtonComponent } from './next-gen-base-button.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';

describe('NextGenBaseButtonComponent DOM', () => {
  let component: NextGenBaseButtonComponent;
  let fixture: ComponentFixture<NextGenBaseButtonComponent>;
  let nativeElement: HTMLElement

  const [
    leftIconId,
    textId,
    rightIconId,
    selectedClass
  ] = [
      "app.next-gen-base-button-left-icon",
      "app.next-gen-base-button-text",
      "app.next-gen-base-button-rigth-icon",
      `[class="next-gen-button-selected"`,
    ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenBaseButtonComponent],
      imports: [
        NgIconsModule
      ],
      providers: [
        provideIcons({})
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NextGenBaseButtonComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display text", () => {
    component.text = "display text"
    fixture.detectChanges()
    const text = nativeElement.querySelector(`[data-testid="${textId}"`)?.textContent
    expect(text).toEqual(component.text)
  })

  it("should update the icon", () => {
    component.leftIcon = "fakeIcon"
    fixture.detectChanges()
    const presentLeftIcon = nativeElement.querySelector(`[data-testid="${leftIconId}"`)
    expect(presentLeftIcon).toBeDefined()
    component.rightIcon = "fakeIcon"
    const presentRightIcon = nativeElement.querySelector(`[data-testid="${rightIconId}"`)
    expect(presentRightIcon).toBeDefined()
  })

  it("should mark the button as selected if selected is true", () => {
    component.selected = false
    fixture.detectChanges()
    const absentSelectedClass = nativeElement.querySelector(selectedClass)
    expect(absentSelectedClass).toBeNull()
    component.selected = true
    fixture.detectChanges()
    const presentSelectedClass = nativeElement.querySelector(selectedClass)
    expect(presentSelectedClass).toBeDefined()
  })
});
