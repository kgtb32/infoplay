import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Subject } from 'rxjs';
import { MenuOpenState } from '../../../models/core/state/menu-open-state';
import { MenuStateService } from '../menu-state.service';
import { AppsMenuService } from './apps-menu.service';
import { applicationsMenu } from '../../../menus/applications';

describe('AppsMenuService', () => {
  let service: AppsMenuService;
  let menuStateService: MenuStateService

  let menuOpenState: Subject<MenuOpenState>

  beforeEach(() => {
    TestBed.configureTestingModule({});
    menuStateService = TestBed.inject(MenuStateService)
    menuOpenState = new Subject<MenuOpenState>()
    spyOn(menuStateService, 'menuOpenedFiltered').and.returnValue(menuOpenState.asObservable())
    service = TestBed.inject(AppsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call the menu generation when menu is asked to be opened", fakeAsync(() => {
    const spy = spyOn(service, 'appsMenu')
    menuOpenState.next({ menuId: AppsMenuService.ID })
    tick(1)
    expect(spy).toHaveBeenCalled()
  }))

  it("should request for menuChange when appMenu is called", () => {
    const spy = spyOn(menuStateService.menuChanged, 'next')
    service.appsMenu()
    expect(spy).toHaveBeenCalledWith({ items: applicationsMenu })
  })
});
