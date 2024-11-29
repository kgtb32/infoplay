import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenInputOverlayComponent } from './next-gen-input-overlay.component';
import { NextGenModule } from '../../../layouts/next-gen/next-gen.module';
import { VirtualKeyboardService } from '../../../services/core/virtual-keyboard.service';

describe('NextGenInputOverlayComponent', () => {
  let component: NextGenInputOverlayComponent;
  let fixture: ComponentFixture<NextGenInputOverlayComponent>;

  let virtualKeyboardService: VirtualKeyboardService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenInputOverlayComponent],
      imports: [
        NextGenModule
      ]
    })
      .compileComponents();
    virtualKeyboardService = TestBed.inject(VirtualKeyboardService)
    fixture = TestBed.createComponent(NextGenInputOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should obfuscate password if input type is password", () => {
    component.type = 'text'
    component.text = 'fake Text'
    expect(component._text).toEqual('fake Text')
    component.type = 'number'
    expect(component._text).toEqual('fake Text')
    component.type = 'password'
    expect(component._text).toEqual('*********t')
    component.text = ''
    expect(component._text).toEqual('')
  })

  it("should update text on keyboard press", () => {
    component.text = ''
    virtualKeyboardService.keyPressed.next('A')
    expect(component.text).toEqual('A')
    virtualKeyboardService.keyPressed.next('B')
    virtualKeyboardService.keyPressed.next(' ')
    virtualKeyboardService.keyPressed.next('C')
    expect(component.text).toEqual('AB C')
  })

  it("should remove last character on DEL action on virtual keyboard", () => {
    component.text = 'ABCD EF'
    virtualKeyboardService.actionButtonPressed.next('DEL')
    expect(component.text).toEqual('ABCD E')
  })

  it("should launch a close event on OK event on virtual keyboard", () => {
    const text = 'ABCDEFG'
    component.text = text
    component.closed.subscribe({
      next: (finalValue: string) => expect(finalValue).toEqual(text)
    })
    virtualKeyboardService.actionButtonPressed.next('OK')
  })

  it("should launch a close event on CAN event on virtual keyboard", () => {
    const text = 'helloWorld'
    component.text = text
    component.closed.subscribe({
      next: (finalValue: string) => expect(finalValue).toBeUndefined()
    })
    virtualKeyboardService.actionButtonPressed.next('CAN')
  })
});
