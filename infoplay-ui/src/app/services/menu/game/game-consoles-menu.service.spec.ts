import { TestBed } from '@angular/core/testing';

import { GameConsolesMenuService } from './game-consoles-menu.service';

describe('GameConsolesMenuService', () => {
  let service: GameConsolesMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameConsolesMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
