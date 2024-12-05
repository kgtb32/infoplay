import { Component } from '@angular/core';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { applicationsMenu } from '../../menus/applications';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { CategoryRouterService } from '../../services/navigation/category-router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss'
})
export class AppsComponent {
  private readonly itemsRoutes: { [key: number]: string } = {
    0: '/apps/webradio',
    1: '/apps/weather',
    2: '/apps/media'
  }

  readonly inlineListMetadata: InlineListMetadata = {
    items: applicationsMenu,
  }

  constructor(
    private readonly categoryRouterService: CategoryRouterService,
    private readonly router: Router
  ) { }

  itemClicked(item: WheelSelectorItem) {
    this.router.navigate([this.itemsRoutes[item.id]])
  }

  categoryChanged(categoryName: string) {
    this.categoryRouterService.categoryChanged(categoryName)
  }
}
