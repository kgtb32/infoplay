import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineListLayoutComponent } from './inline-list-layout.component';

describe('InlineListLayoutComponent', () => {
  let component: InlineListLayoutComponent;
  let fixture: ComponentFixture<InlineListLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineListLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
