import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenTitleComponent } from './next-gen-title.component';
import { EventEmitter } from '@angular/core';

describe('NextGenTitleComponent', () => {
  let component: NextGenTitleComponent;
  let fixture: ComponentFixture<NextGenTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenTitleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NextGenTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should not handle position and clicked events", () => {
    expect(component.afterPositionChanged(new EventEmitter())).toBeUndefined()
    expect(component.afterClickedEventChanged(new EventEmitter())).toBeUndefined()
  })
});
