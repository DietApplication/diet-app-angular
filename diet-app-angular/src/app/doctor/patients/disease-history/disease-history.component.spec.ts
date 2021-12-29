import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseHistoryComponent } from './disease-history.component';

describe('DiseaseHistoryComponent', () => {
  let component: DiseaseHistoryComponent;
  let fixture: ComponentFixture<DiseaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
