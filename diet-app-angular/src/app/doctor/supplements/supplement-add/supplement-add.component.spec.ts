import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementAddComponent } from './supplement-add.component';

describe('SupplementAddComponent', () => {
  let component: SupplementAddComponent;
  let fixture: ComponentFixture<SupplementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
