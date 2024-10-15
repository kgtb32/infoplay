import { TestBed } from '@angular/core/testing';

import { JoypadService } from './joypad.service';

describe('JoypadService', () => {
  let service: JoypadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoypadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
