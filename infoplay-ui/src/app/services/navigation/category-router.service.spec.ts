import { TestBed } from '@angular/core/testing';

import { CategoryRouterService } from './category-router.service';

describe('CategoryRouterService', () => {
  let service: CategoryRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
