import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasesPatientComponent } from './diseases-patient.component';

describe('DiseasesPatientComponent', () => {
  let component: DiseasesPatientComponent;
  let fixture: ComponentFixture<DiseasesPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseasesPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasesPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
