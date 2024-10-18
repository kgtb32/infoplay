import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineListComponent } from './inline-list.component';

describe('InlineListComponent', () => {
  let component: InlineListComponent;
  let fixture: ComponentFixture<InlineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
