import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesGamesComponent } from './favorites-games.component';
import { provideHttpClient } from '@angular/common/http';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { Router } from '@angular/router';
import { CategoryRouterService } from '../../services/navigation/category-router.service';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';

describe('FavoritesGamesComponent', () => {
  let component: FavoritesGamesComponent;
  let fixture: ComponentFixture<FavoritesGamesComponent>;

  let router: Router
  let categoryRouterService: CategoryRouterService
  let gameService: GameService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesGamesComponent],
      imports: [
        InlineListLayoutModule
      ],
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();

    router = TestBed.inject(Router)
    gameService = TestBed.inject(GameService)
    categoryRouterService = TestBed.inject(CategoryRouterService)

    fixture = TestBed.createComponent(FavoritesGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should run game when game tile is clicked", () => {
    const game: WheelSelectorItem = {
      id: 0,
      name: 'test',
      action: (_item) => void 0,
      image: 'http://localhost/img.png'
    }
    const spy = spyOn(router, "navigate")
    component.itemClicked(game)
    expect(spy).toHaveBeenCalledOnceWith(["/game/0/play"], {
      state: {
        ...game,
        action: undefined
      }
    })
  })

  it("should handle category change", () => {
    const spy = spyOn(categoryRouterService, "categoryChanged")
    component.categoryChanged("test")
    expect(spy).toHaveBeenCalledOnceWith("test")
  })

  it("should load favorites games and update the inline list metadata", () => {
    const games: WheelSelectorItem[] = Array(42).fill({
      id: 0,
      name: 'test',
      action: (_item: WheelSelectorItem) => void 0,
      image: 'http://localhost/img.png'
    })
    spyOn(gameService, "getFavoritesGames").and.returnValue(of(games))
    component.ngOnInit()
    expect(component.inlineListMetadata).toEqual({
      items: games,
    })
  })
});
