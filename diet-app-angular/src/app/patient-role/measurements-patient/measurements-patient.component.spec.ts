import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsPatientComponent } from './measurements-patient.component';

describe('MeasurementsPatientComponent', () => {
  let component: MeasurementsPatientComponent;
  let fixture: ComponentFixture<MeasurementsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementsPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
