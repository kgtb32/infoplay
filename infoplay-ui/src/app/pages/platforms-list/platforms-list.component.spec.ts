import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformsListComponent } from './platforms-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { Platform } from '../../models/api/platform';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

const platforms: Platform[] = Array(42).fill({
  description: {
    description: 'test platform',
    publisher: 'kgtb32',
    releaseDate: '2025',
  },
  displayName: 'Test Platform',
  imagePath: '/platforms/test_platform.png',
  name: 'test_platform',
});

describe('PlatformsListComponent', () => {
  let component: PlatformsListComponent;
  let fixture: ComponentFixture<PlatformsListComponent>;

  let router: Router
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformsListComponent],
      providers: [provideHttpClient(withInterceptorsFromDi())],
      imports: [InlineListLayoutModule, CommonModule],
    }).compileComponents();
    spyOn(window, "clearInterval").and.callFake(() => void 0)
    gameService = TestBed.inject(GameService);
    router = TestBed.inject(Router)

    fixture = TestBed.createComponent(PlatformsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get platforms', () => {
    spyOn(gameService, 'getPlatforms').and.returnValue(of(platforms));
    component.ngOnInit();
    component.inlineListMetadata.items.forEach((item, i) => {
      expect(item.id).toBeDefined();
      expect(item.name).toEqual(platforms.at(i)?.displayName!);
      expect(item.description?.company).toEqual(
        platforms.at(i)?.description.publisher,
      );
      expect(item.description?.description).toEqual(
        platforms.at(i)?.description.description,
      );
      expect(item.description?.releaseDate).toEqual(
        platforms.at(i)?.description.releaseDate,
      );
      expect(item.image).toEqual(platforms.at(i)?.imagePath);
    });
  });

  it('should navigate to games by platform page when platform is clicked', () => {
    const platforms: Platform[] = [
      {
        description: {
          description: 'test platform',
          publisher: 'kgtb32',
          releaseDate: '2025',
        },
        displayName: 'Test Platform',
        imagePath: '/platforms/test_platform.png',
        name: 'test_platform',
      },
      {
        description: {
          description: 'test platform 2',
          publisher: 'kgtb32',
          releaseDate: '2026',
        },
        displayName: 'Test Platform 2',
        imagePath: '/platforms/test_platform.png',
        name: 'test_platform_2',
      },
    ];
    spyOn(gameService, "getPlatforms").and.returnValue(of(platforms))
    const spy = spyOn(router, "navigate")
    component.ngOnInit()
    component.inlineListMetadata.items.at(1)?.action?.({} as WheelSelectorItem)
    expect(spy).toHaveBeenCalledOnceWith(["/platforms", "test_platform_2", "games"])
  });
});
