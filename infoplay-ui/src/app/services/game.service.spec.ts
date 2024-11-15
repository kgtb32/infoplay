import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { provideHttpClient } from '@angular/common/http';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
