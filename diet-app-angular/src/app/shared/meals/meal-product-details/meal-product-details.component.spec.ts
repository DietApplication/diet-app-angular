import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealProductDetailsComponent } from './meal-product-details.component';

describe('MealProductDetailsComponent', () => {
  let component: MealProductDetailsComponent;
  let fixture: ComponentFixture<MealProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
