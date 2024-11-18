import { TestBed } from '@angular/core/testing';

import { AudioMenuService } from './audio-menu.service';

describe('AudioMenuService', () => {
  let service: AudioMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
