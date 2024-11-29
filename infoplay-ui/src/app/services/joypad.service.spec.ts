import { TestBed } from '@angular/core/testing';

import { JoypadService } from './joypad.service';
import { ButtonPressedDetails } from '../models/core/joypad/joypad-connect-event';
import { Observable, Subject } from 'rxjs';

describe('JoypadService', () => {
  let service: JoypadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoypadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should restrict joypad for a certain ID", () => {
    service.restricForId("fakeId")
    expect(service.currentEnabledIds).toEqual(["fakeId"])
  })

  it("should allow all ids", () => {
    service.restricForId("fakeId")
    service.allowAll()
    expect(service.currentEnabledIds).toEqual([])
  })

  const checkEventFilteredCalled = (moveEventObs: Observable<ButtonPressedDetails>, moveEvent: Subject<ButtonPressedDetails>) => {
    moveEventObs.subscribe({
      next: () => expect().nothing()
    })
    moveEvent.next({} as ButtonPressedDetails)
  }

  const checkEventFilteredNotCalled = (moveEventObs: Observable<ButtonPressedDetails>, moveEvent: Subject<ButtonPressedDetails>) => {
    moveEventObs.subscribe({
      next: () => fail("event has been emited")
    })
    moveEvent.next({} as ButtonPressedDetails)
    expect(service.currentEnabledIds).toEqual(["fakeId"])
  }

  it("should emit event if filtered on the id", () => {
    service.restricForId("fakeId")
    checkEventFilteredCalled(service.axisMoveEventFiltered("fakeId"), service.axisMoveEvent)
    checkEventFilteredCalled(service.buttonPressEventFiltered("fakeId"), service.buttonPressEvent)
  })

  it("should not emit event if filtered id is different", () => {
    service.restricForId("fakeId")
    checkEventFilteredNotCalled(service.axisMoveEventFiltered("invalidId"), service.axisMoveEvent)
    checkEventFilteredNotCalled(service.buttonPressEventFiltered("invalidId"), service.buttonPressEvent)
  })
});
