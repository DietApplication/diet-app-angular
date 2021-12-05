import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsItemComponent } from './patients-item.component';

describe('PatientsItemComponent', () => {
  let component: PatientsItemComponent;
  let fixture: ComponentFixture<PatientsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
