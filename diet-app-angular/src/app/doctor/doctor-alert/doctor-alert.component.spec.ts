import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAlertComponent } from './doctor-alert.component';

describe('DoctorAlertComponent', () => {
  let component: DoctorAlertComponent;
  let fixture: ComponentFixture<DoctorAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
