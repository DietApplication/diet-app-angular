import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementItemComponent } from './supplement-item.component';

describe('SupplementItemComponent', () => {
  let component: SupplementItemComponent;
  let fixture: ComponentFixture<SupplementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
