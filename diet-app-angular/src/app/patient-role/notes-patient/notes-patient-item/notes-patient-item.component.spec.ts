import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesPatientItemComponent } from './notes-patient-item.component';

describe('NotesPatientItemComponent', () => {
  let component: NotesPatientItemComponent;
  let fixture: ComponentFixture<NotesPatientItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesPatientItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesPatientItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
