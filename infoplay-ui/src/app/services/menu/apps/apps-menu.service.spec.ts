import { TestBed } from '@angular/core/testing';

import { AppsMenuService } from './apps-menu.service';

describe('AppsMenuService', () => {
  let service: AppsMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
