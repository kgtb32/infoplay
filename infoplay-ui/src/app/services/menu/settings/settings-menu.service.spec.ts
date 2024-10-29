import { TestBed } from '@angular/core/testing';

import { SettingsMenuService } from './settings-menu.service';

describe('SettingsMenuService', () => {
  let service: SettingsMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
