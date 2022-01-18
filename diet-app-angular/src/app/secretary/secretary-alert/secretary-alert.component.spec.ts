import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryAlertComponent } from './secretary-alert.component';

describe('SecretaryAlertComponent', () => {
  let component: SecretaryAlertComponent;
  let fixture: ComponentFixture<SecretaryAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
