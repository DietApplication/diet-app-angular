import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAlertComponent } from './patient-alert.component';

describe('PatientAlertComponent', () => {
  let component: PatientAlertComponent;
  let fixture: ComponentFixture<PatientAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
