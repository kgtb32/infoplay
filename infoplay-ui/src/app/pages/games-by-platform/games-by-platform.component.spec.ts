import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { defaultLoadingMenu } from '../../menus/default-loading-menu';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { GameService } from '../../services/game.service';
import { GamesByPlatformComponent } from './games-by-platform.component';
import { CategoryRouterService } from '../../services/navigation/category-router.service';

const paramMap = new Map()

const games: WheelSelectorItem[] = [
  {
    id: 0,
    name: 'test_game_0',
  },
  {
    id: 1,
    name: 'test_game_1'
  }
]

describe('GamesByPlatformComponent', () => {
  let component: GamesByPlatformComponent;
  let fixture: ComponentFixture<GamesByPlatformComponent>;

  let gameService: GameService
  let router: Router
  let categoryRouterService: CategoryRouterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesByPlatformComponent],
      imports: [
        InlineListLayoutModule
      ],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(paramMap)
          }
        }
      ]
    })
      .compileComponents();

    gameService = TestBed.inject(GameService)
    router = TestBed.inject(Router)
    categoryRouterService = TestBed.inject(CategoryRouterService)
    paramMap.set("id", "42")
    fixture = TestBed.createComponent(GamesByPlatformComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    expect(component.inlineListMetadata).toBeDefined()
    expect(component.inlineListMetadata).toEqual(defaultLoadingMenu)
    component.ngOnInit()
    expect(component.inlineListMetadata.items).toEqual([])
    paramMap.delete("id")
    component.ngOnInit()
    expect(component.inlineListMetadata.items).toEqual([])
  }));

  it("should get games by platform", fakeAsync(() => {
    const spy = spyOn(gameService, "getGamesByPlatformAndLetter").and.returnValue(of(games))
    component.ngOnInit()
    component.inlineListMetadata.letterFiltering?.letterSelectedCallback("A").subscribe({
      next: currentGames => {
        expect(spy).toHaveBeenCalledWith("42", "A")
        expect(currentGames.length).toEqual(games.length + 1) //back button included
      }
    })
  }))

  it("should play go back when back button is clicked", () => {
    const spy = spyOn(gameService, "getGamesByPlatformAndLetter").and.returnValue(of(games))
    const routerSpy = spyOn(router, "navigate")
    component.ngOnInit()
    component.inlineListMetadata.letterFiltering?.letterSelectedCallback("A").subscribe({
      next: items => {
        expect(spy).toHaveBeenCalledWith("42", "A")
        items.at(0)?.action?.(items.at(0)!)
        expect(routerSpy).toHaveBeenCalledOnceWith(["/platforms"])
      }
    })
  })

  it("should play game when game tile is clicked", () => {
    const spy = spyOn(gameService, "getGamesByPlatformAndLetter").and.returnValue(of(games))
    const routerSpy = spyOn(router, "navigate")
    component.ngOnInit()
    component.inlineListMetadata.letterFiltering?.letterSelectedCallback("A").subscribe({
      next: items => {
        expect(spy).toHaveBeenCalledWith("42", "A")
        items.at(1)?.action?.(items.at(1)!)
        expect(routerSpy).toHaveBeenCalledOnceWith(["/game/0/play"], {
          state: {
            id: 0,
            name: "test_game_0",
            action: undefined
          }
        })
      }
    })
  })

  it("should change category", () => {
    const spy = spyOn(categoryRouterService, "categoryChanged")
    component.categoryChanged("Jeux")
    expect(spy).not.toHaveBeenCalled()
    component.categoryChanged("toto")
    expect(spy).toHaveBeenCalledOnceWith("toto")
  })

});
