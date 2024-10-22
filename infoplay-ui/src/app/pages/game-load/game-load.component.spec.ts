import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLoadComponent } from './game-load.component';

describe('GameLoadComponent', () => {
  let component: GameLoadComponent;
  let fixture: ComponentFixture<GameLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
