import { Component } from '@angular/core';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { settingsMenu } from '../../menus/settings';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { CategoryRouterService } from '../../services/navigation/category-router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  private static readonly routesAssociations: { [key: number]: string } = {
    0: '/settings/wifi',
    1: '/settings/audio',
    2: '/settings/bluetooth'
  }

  inlineListMetadata: InlineListMetadata = {
    items: settingsMenu,
  }

  constructor(
    private readonly categoryRouterService: CategoryRouterService,
    private readonly router: Router
  ) { }

  itemClicked(item: WheelSelectorItem) {
    this.router.navigate([SettingsComponent.routesAssociations[item.id]])
  }

  categoryChanged(categoryName: string) {
    this.categoryRouterService.categoryChanged(categoryName)
  }
}
