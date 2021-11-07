import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyLoginComponent } from './survey-login.component';

describe('SurveyLoginComponent', () => {
  let component: SurveyLoginComponent;
  let fixture: ComponentFixture<SurveyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
