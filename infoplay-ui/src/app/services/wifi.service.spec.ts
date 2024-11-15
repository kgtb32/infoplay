import { TestBed } from '@angular/core/testing';

import { WifiService } from './wifi.service';
import { provideHttpClient } from '@angular/common/http';

describe('WifiService', () => {
  let service: WifiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(WifiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
