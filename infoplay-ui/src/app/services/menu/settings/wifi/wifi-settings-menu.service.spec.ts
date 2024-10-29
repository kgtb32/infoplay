import { TestBed } from '@angular/core/testing';

import { WifiSettingsMenuService } from './wifi-settings-menu.service';

describe('WifiSettingsMenuService', () => {
  let service: WifiSettingsMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiSettingsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
