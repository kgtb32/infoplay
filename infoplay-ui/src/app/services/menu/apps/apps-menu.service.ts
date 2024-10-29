import { Injectable } from '@angular/core';
import { MenuStateService } from '../menu-state.service';
import { applicationsMenu } from '../../../menus/applications';

@Injectable({
  providedIn: 'root'
})
export class AppsMenuService {

  constructor(
    private readonly menuStateService: MenuStateService,
  ) { }

  appsMenu() {
    this.menuStateService.menuChanged.next(applicationsMenu)
  }
}
