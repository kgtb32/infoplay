import { Injectable } from '@angular/core';
import { MenuStateService } from '../menu-state.service';
import { applicationsMenu } from '../../../menus/applications';

@Injectable({
  providedIn: 'root'
})
export class AppsMenuService {
  public static readonly ID = "apps-menu"

  constructor(
    private readonly menuStateService: MenuStateService,
  ) {
    this.menuStateService.menuOpenedFiltered(AppsMenuService.ID).subscribe({
      next: () => this.appsMenu()
    })
  }

  appsMenu() {
    this.menuStateService.menuChanged.next({ items: applicationsMenu })
  }
}
