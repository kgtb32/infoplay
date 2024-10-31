import { TestBed } from '@angular/core/testing';

import { GameByPlatformMenuService } from './game-by-platform-menu.service';

describe('GameByPlatformService', () => {
  let service: GameByPlatformMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameByPlatformMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
