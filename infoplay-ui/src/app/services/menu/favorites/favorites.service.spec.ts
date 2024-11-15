import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { filter, of } from 'rxjs';
import { InlineListMetadata } from '../../../models/components/inline-list-metadata';
import { WheelSelectorItem } from '../../../models/components/wheel-selector-item';
import { GameService } from '../../game.service';
import { MenuStateService } from '../menu-state.service';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  let router: Router
  let menuStateService: MenuStateService
  let gameService: GameService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    menuStateService = TestBed.inject(MenuStateService)

    router = TestBed.inject(Router)
    service = TestBed.inject(FavoritesService);
    gameService = TestBed.inject(GameService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should open favorites menu when requested", () => {
    const spy = spyOn(service, 'favorites')
    menuStateService.menuOpen.next({ menuId: FavoritesService.ID })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should get favorites and open favorites menu", () => {
    const items: WheelSelectorItem[] = [
      {
        id: 0,
        name: 'foo'
      },
      {
        id: 1,
        name: 'bar'
      }
    ]
    spyOn(gameService, "getFavoritesGames").and.returnValue(
      of(items)
    )
    const navigateSpy = spyOn(router, "navigate")
    menuStateService.menuChanged
      .pipe(filter(item => item.items.length > 0))
      .subscribe({
        next: (metadata: InlineListMetadata) => {
          metadata.items.forEach((item, index) => {
            expect(item.name).toEqual(items[index].name)
            expect(item.id).toEqual(items[index].id)
          })
          metadata.items[0]?.action?.(items[0])
          expect(navigateSpy).toHaveBeenCalledOnceWith(['/game/0/play'], {
            state: { ...items[0], action: undefined }
          })
        }
      })
    service.favorites()
  })
});
