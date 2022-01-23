import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPatientComponent } from './diet-patient.component';

describe('DietPatientComponent', () => {
  let component: DietPatientComponent;
  let fixture: ComponentFixture<DietPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
