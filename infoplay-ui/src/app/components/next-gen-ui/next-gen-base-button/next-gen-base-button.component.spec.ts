import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextGenBaseButtonComponent } from './next-gen-base-button.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';

describe('NextGenBaseButtonComponent', () => {
  let component: NextGenBaseButtonComponent;
  let fixture: ComponentFixture<NextGenBaseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextGenBaseButtonComponent],
      imports: [
        NgIconsModule
      ],
      providers: [
        provideIcons({})
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NextGenBaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
