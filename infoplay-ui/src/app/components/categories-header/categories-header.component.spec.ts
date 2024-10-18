import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesHeaderComponent } from './categories-header.component';

describe('CategoriesHeaderComponent', () => {
  let component: CategoriesHeaderComponent;
  let fixture: ComponentFixture<CategoriesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
