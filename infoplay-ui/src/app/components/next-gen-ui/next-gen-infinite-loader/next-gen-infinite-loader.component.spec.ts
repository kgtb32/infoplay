import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenInfiniteLoaderComponent } from './next-gen-infinite-loader.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { EventEmitter } from '@angular/core';

describe('NextGenInfiniteLoaderComponent', () => {
  let component: NextGenInfiniteLoaderComponent;
  let fixture: ComponentFixture<NextGenInfiniteLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenInfiniteLoaderComponent],
      imports: [
        NgIconsModule
      ],
      providers: [
        provideIcons({})
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NextGenInfiniteLoaderComponent);
    component = fixture.componentInstance;
    component.rotateAnimation = true
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should not handle position changed and clicked events", () => {
    expect(component.afterClickedEventChanged(new EventEmitter())).toBeUndefined()
    expect(component.afterPositionChanged(new EventEmitter())).toBeUndefined()
  })
});
