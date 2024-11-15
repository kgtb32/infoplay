import { TestBed } from '@angular/core/testing';

import { GameByPlatformMenuService } from './game-by-platform-menu.service';
import { provideHttpClient } from '@angular/common/http';
import { MenuStateService } from '../menu-state.service';
import { InlineListMetadata } from '../../../models/components/inline-list-metadata';
import { DefaultBack } from '../../../menus/default-back';
import { filter, of } from 'rxjs';
import { GameConsolesMenuService } from './game-consoles-menu.service';
import { GameService } from '../../game.service';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';
import { Router } from '@angular/router';

describe('GameByPlatformService', () => {
  let service: GameByPlatformMenuService;

  let menuStateService: MenuStateService
  let gameService: GameService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    menuStateService = TestBed.inject(MenuStateService)

    service = TestBed.inject(GameByPlatformMenuService);
    gameService = TestBed.inject(GameService)
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should init default menu", () => {
    menuStateService.menuChanged.subscribe({
      next: (menu: InlineListMetadata) => {
        expect(menu.letterFiltering).toBeDefined()
        expect(menu.items.length).toBe(1)
        expect(menu.items[0].id).toBe(DefaultBack.id)
        expect(menu.items[0].name).toBe(DefaultBack.name)
        expect(menu.items[0].icon).toBe(DefaultBack.icon)
      }
    })
    menuStateService.menuOpen.next({ menuId: GameByPlatformMenuService.ID })
  })

  it("should go back when the back item is selected", () => {
    menuStateService.menuOpen.pipe(filter(item => item.menuId !== GameByPlatformMenuService.ID))
      .subscribe({
        next: menu => expect(menu.menuId).toEqual(GameConsolesMenuService.ID)
      })
    menuStateService.menuChanged.subscribe({
      next: (metadata: InlineListMetadata) => {
        metadata.items[0]?.action?.(metadata.items[0])
      }
    })
    menuStateService.menuOpen.next({ menuId: GameByPlatformMenuService.ID })
  })

  it("should update the menu when games filtered by letters are retrieven", () => {
    const items: WheelSelectorItem[] = [
      {
        id: 0,
        name: 'foo',
      },
      {
        id: 1,
        name: 'bar'
      }
    ]
    const navigateSpy = spyOn(router, "navigate")

    const testFilteredGamesResult = (filteredGames: WheelSelectorItem[]) => {
      expect(filteredGames.length).toBe(items.length + 1);
      [DefaultBack, ...items].forEach((item, index) => {
        expect(item.name).toEqual(filteredGames[index].name);
        expect(item.id).toEqual(filteredGames[index].id);
      })
      filteredGames[1]?.action?.(filteredGames?.[1])
      expect(navigateSpy).toHaveBeenCalledOnceWith(['/game/0/play'], {
        state: { ...filteredGames[1], action: undefined }
      })
    }

    spyOn(gameService, "getGamesByPlatformAndLetter").and.returnValue(of(items))
    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => {
        state.letterFiltering?.letterSelectedCallback('A').subscribe({
          next: (filteredGames) => testFilteredGamesResult(filteredGames)
        })
      }
    })
    menuStateService.menuOpen.next({ menuId: GameByPlatformMenuService.ID })
  })
});
