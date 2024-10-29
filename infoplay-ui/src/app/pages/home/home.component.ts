import { ChangeDetectorRef, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { MenuStateService } from '../../services/menu/menu-state.service';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  wheelItems: WheelSelectorItem[] = []

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly menuService: MenuService,
    private readonly menuStateService: MenuStateService
  ) {
    this.menuStateService.menuChanged
      .pipe(takeUntilDestroyed())
      .subscribe(menuItems => {
        this.wheelItems = menuItems
        this.cd.detectChanges()
      })
  }

  public itemClicked(item: WheelSelectorItem) {
    return item.action?.(item)
  }

  public categoryChanged(category: string) {
    this.menuService.categoryChanged(category)
    this.cd.detectChanges()
  }
}
