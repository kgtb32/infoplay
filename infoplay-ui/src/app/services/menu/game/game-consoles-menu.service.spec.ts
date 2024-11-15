import { TestBed } from '@angular/core/testing';

import { GameConsolesMenuService } from './game-consoles-menu.service';
import { provideHttpClient } from '@angular/common/http';
import { Platform } from '../../../models/api/platform';
import { MenuStateService } from '../menu-state.service';
import { InlineListMetadata } from '../../../models/components/inline-list-metadata';
import { filter, of } from 'rxjs';
import { GameByPlatformMenuService } from './game-by-platform-menu.service';
import { GameService } from '../../game.service';

describe('GameConsolesMenuService', () => {
  let service: GameConsolesMenuService;

  let menuStateService: MenuStateService
  let gameService: GameService

  const platforms: Platform[] = [
    {
      name: 'atari2600',
      displayName: 'Atari 2600',
      imagePath: 'consoles/images/atari2600.png',
      description: {
        description: 'description',
        publisher: 'atari',
        releaseDate: 'a long time ago'
      }
    },
    {
      name: 'atari7200',
      displayName: 'Atari 7200',
      imagePath: 'consoles/images/atari7200.png',
      description: {
        description: 'description',
        publisher: 'atari',
        releaseDate: 'a long time ago'
      }
    },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    gameService = TestBed.inject(GameService)
    menuStateService = TestBed.inject(MenuStateService)
    service = TestBed.inject(GameConsolesMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should update the platform list menu", () => {
    spyOn(gameService, "getPlatforms").and.returnValue(of(platforms))
    menuStateService.menuOpen.pipe(filter(menu => menu.menuId !== GameConsolesMenuService.ID)).subscribe({
      next: state => state.menuId === GameByPlatformMenuService.ID
    })
    let index = 0
    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => {
        if (index > 0) {
          expect(state.items.length).toBe(platforms.length)
          state.items.forEach(platform => platform?.action?.(platform))
        }
        index++
      }
    })
    menuStateService.menuOpen.next({ menuId: GameConsolesMenuService.ID })
  })
});
