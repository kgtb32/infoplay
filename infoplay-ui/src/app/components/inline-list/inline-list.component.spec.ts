import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { ButtonPressedDetails } from '../../models/core/joypad/joypad-connect-event';
import { AudioService } from '../../services/audio.service';
import { JoypadService } from '../../services/joypad.service';
import { MenuStateService } from '../../services/menu/menu-state.service';
import { InlineListComponent } from './inline-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('InlineListComponent', () => {
  let component: InlineListComponent;
  let fixture: ComponentFixture<InlineListComponent>;

  let joypadService: JoypadService
  let audioService: AudioService
  let menuStateService: MenuStateService

  const metadata = () => ({
    items: Array(12).fill({ id: 0, name: 'Item 1' }),
  })

  beforeEach(async () => {
    jasmine.clock().install()
    await TestBed.configureTestingModule({
      declarations: [InlineListComponent],
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();
    joypadService = TestBed.inject(JoypadService)
    audioService = TestBed.inject(AudioService)
    menuStateService = TestBed.inject(MenuStateService)

    fixture = TestBed.createComponent(InlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall()
    joypadService.axisMoveEvent.unsubscribe()
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should update metadata", () => {
    component.selectedIndex = 42
    component.metadata = metadata()
    expect(component._metadata).toEqual(metadata())
    expect(component.selectedIndex).toBe(0)
  })

  it("should get element scroll container", () => {
    expect(component.documentElementScroll.classList.contains("home-list-items-containers")).toBeTrue()
  })

  const testRightMax = () => {
    component.selectedIndex = metadata().items.length - 1
    joypadService.axisMoveEvent.next({
      directionOfMovement: 'right'
    } as ButtonPressedDetails)
    expect(component.selectedIndex).toBe(metadata().items.length - 1)
  }

  it("should handle axis movement using joypad", fakeAsync(() => {
    component.metadata = metadata()
    tick(10)
    expect(component._metadata).toEqual(metadata())
    spyOn(audioService, "select").and.callFake(() => void 0)
    jasmine.clock().mockDate(new Date(new Date().getTime() + 200))
    joypadService.axisMoveEvent.next({
      directionOfMovement: 'right'
    } as ButtonPressedDetails)
    tick(1000)
    expect(component.selectedIndex).toBe(1)

    Array(2).fill(0).forEach(() => {
      jasmine.clock().mockDate(new Date(new Date().getTime() + 200))
      joypadService.axisMoveEvent.next({
        directionOfMovement: 'left'
      } as ButtonPressedDetails)
      tick(10)
    })
    expect(component.selectedIndex).toBe(0)

    component.selectedIndex = metadata().items.length - 1
    joypadService.axisMoveEvent.next({
      directionOfMovement: 'right'
    } as ButtonPressedDetails)
    tick(10)
    expect(component.selectedIndex).toBe(metadata().items.length - 1)
    testRightMax()
  }))

  it("should autoscroll inside the list", () => {
    component.metadata = metadata()
    spyOn(audioService, "select").and.callFake(() => void 0)
    const elementScrollSpy = spyOn(component.documentElementScroll, "scroll")
    jasmine.clock().mockDate(new Date(new Date().getTime() + 200))
    testRightMax()
    jasmine.clock().tick(10)
    expect(elementScrollSpy).toHaveBeenCalled()
  })

  it("should handle direct menu change", () => {
    component.metadata = metadata()
    component.selectedIndex = 42
    menuStateService.directMenuChanged.next([{ id: 0, name: 'Item fake' }])
    expect(component.selectedIndex).toBe(0)
    expect(component._metadata.items.length).toBe(1)
  })

  it("should notify menu selection validation", () => {
    component.metadata = metadata()
    component.itemClicked.subscribe({
      next: (item: WheelSelectorItem) => expect(item).toEqual(metadata().items[0])
    })
    joypadService.buttonPressEvent.next({ buttonName: 'button_0' } as ButtonPressedDetails)
  })
});
