import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { Navigation, NavigationExtras, Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GameDescriptionModule } from '../../components/game-description/game-description.module';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { GameService } from '../../services/game.service';
import { GameLoadComponent } from './game-load.component';
import { of } from 'rxjs';
import { JoypadService } from '../../services/joypad.service';

describe('GameLoadComponent', () => {
  let component: GameLoadComponent;
  let fixture: ComponentFixture<GameLoadComponent>;

  let gameService: GameService
  let router: Router
  let joypadService: JoypadService

  const state: WheelSelectorItem = {
    id: 0,
    name: 'test'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameLoadComponent],
      imports: [
        ProgressSpinnerModule,
        GameDescriptionModule,
      ],
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();


    jasmine.clock().install()

    gameService = TestBed.inject(GameService)
    router = TestBed.inject(Router)
    joypadService = TestBed.inject(JoypadService)
  });

  afterEach(() => jasmine.clock().uninstall())

  const initComponent = () => {
    fixture = TestBed.createComponent(GameLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }

  it('should create', () => {
    const backSpy = spyOn(router, "navigate")
    initComponent()
    expect(backSpy).toHaveBeenCalledOnceWith(['/'])
  });

  const initNavigationStateMock = () => {
    spyOn(router, "getCurrentNavigation").and.returnValue({
      extras: {
        state
      } as NavigationExtras
    } as Navigation)
  }

  it("should create and load game saved", () => {
    initNavigationStateMock()
    initComponent()
    expect(component.game).toEqual(state)
  })

  it("should launch the game and go back after game closed", () => {
    const backSpy = spyOn(router, "navigate")
    spyOn(gameService, "playGame").and.returnValue(of(true))
    initNavigationStateMock()
    initComponent()
    expect(joypadService.joypadEnabled).toBeFalse()
    jasmine.clock().tick(5000)
    expect(joypadService.joypadEnabled).toBeTrue()
    expect(backSpy).toHaveBeenCalledOnceWith(['/'])
  })
});
