import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSurveyComponent } from './alert-survey.component';

describe('AlertSurveyComponent', () => {
  let component: AlertSurveyComponent;
  let fixture: ComponentFixture<AlertSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
