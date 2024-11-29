import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';
import { NextGenModule } from '../../../layouts/next-gen/next-gen.module';
import { NextGenInputTextComponent } from './next-gen-input-text.component';
import { JoypadService } from '../../../services/joypad.service';
import { VirtualKeyboardComponent } from '../../virtual-keyboard/virtual-keyboard.component';

describe('NextGenInputTextComponent', () => {
  let component: NextGenInputTextComponent;
  let fixture: ComponentFixture<NextGenInputTextComponent>;

  let joypadService: JoypadService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenInputTextComponent],
      imports: [
        NextGenModule
      ]
    })
      .compileComponents();

    joypadService = TestBed.inject(JoypadService)
    fixture = TestBed.createComponent(NextGenInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should handle position change", () => {
    const positionChangedEvent: EventEmitter<number> = new EventEmitter()
    component.afterPositionChanged(positionChangedEvent)
    component.currentPosition = 42
    positionChangedEvent.next(42)
    expect(component.selected).toBeTrue()
    positionChangedEvent.next(128)
    expect(component.selected).toBeFalse()
  })

  it("should handle click events", () => {
    component.selected = false
    component.displayModal = false
    const clickedEvent: EventEmitter<void> = new EventEmitter()
    component.afterClickedEventChanged(clickedEvent)
    clickedEvent.next()
    expect(component.displayModal).toBeFalse()
    component.selected = true
    clickedEvent.next()
    expect(component.displayModal).toBeTrue()
    expect(joypadService.currentEnabledIds).toEqual([VirtualKeyboardComponent.JOYPAD_SCENE_ID])
  })

  it("should handle overlay close result", () => {
    component.text = 'titi'
    joypadService.restricForId('fakeId')
    component.displayModal = true
    component.closed()
    expect(component.displayModal).toBeFalse()
    expect(joypadService.currentEnabledIds).toEqual([])
    component.displayModal = true
    joypadService.restricForId('fakeId')
    component.closed("tutu")
    expect(component.displayModal).toBeFalse()
    expect(component.text).toEqual("tutu")
    expect(joypadService.currentEnabledIds).toEqual([])
  })

  it("should obfuscate password if input type is password", () => {
    component.type = 'text'
    component.text = 'fake Text'
    expect(component._text).toEqual('fake Text')
    component.type = 'number'
    expect(component.text).toEqual('fake Text')
    component.type = 'password'
    expect(component.text).toEqual('*********')
    component.text = ''
    expect(component.text).toEqual('')
  })
});
