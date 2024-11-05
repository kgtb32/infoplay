import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterFilterComponent } from './letter-filter.component';

describe('LetterFilterComponent', () => {
  let component: LetterFilterComponent;
  let fixture: ComponentFixture<LetterFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
