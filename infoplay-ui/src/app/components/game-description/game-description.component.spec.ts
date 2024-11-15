import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDescriptionComponent } from './game-description.component';

describe('GameDescriptionComponent', () => {
  let component: GameDescriptionComponent;
  let fixture: ComponentFixture<GameDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameDescriptionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameDescriptionComponent);
    component = fixture.componentInstance;
    component.game = {
      id: 0,
      name: 'test'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
