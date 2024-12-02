import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultLoadingMenu } from '../../menus/default-loading-menu';
import { Platform } from '../../models/api/platform';
import { InlineListMetadata } from '../../models/components/inline-list-metadata';
import { GameService } from '../../services/game.service';
import { mapPlatformToWheelSelector } from '../../services/mappers/platform-mapper';
import { CategoryRouterService } from '../../services/navigation/category-router.service';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrl: './platforms-list.component.scss',
})
export class PlatformsListComponent implements OnInit {
  inlineListMetadata: InlineListMetadata = defaultLoadingMenu;

  constructor(
    private readonly gameService: GameService,
    private readonly router: Router,
    private readonly categoryRouterService: CategoryRouterService,
  ) { }

  ngOnInit(): void {
    this.gameService.getPlatforms().subscribe({
      next: (platforms) => this.platformsRetrieven(platforms),
    });
  }

  platformsRetrieven(platforms: Platform[]) {
    const displayPlatforms = platforms.map((platform, i) => ({
      ...mapPlatformToWheelSelector(platform, i),
      action: () => this.platformClicked(platform.name),
    }));
    this.inlineListMetadata = {
      items: displayPlatforms,
    };
  }

  private platformClicked(name: string) {
    this.router.navigate(['platform', name, 'games'])
  }

  categoryChanged(categoryName: string) {
    this.categoryRouterService.categoryChanged(categoryName);
  }
}
