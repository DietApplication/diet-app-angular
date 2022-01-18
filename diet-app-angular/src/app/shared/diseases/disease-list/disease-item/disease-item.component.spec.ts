import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseItemComponent } from './disease-item.component';

describe('DiseaseItemComponent', () => {
  let component: DiseaseItemComponent;
  let fixture: ComponentFixture<DiseaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
