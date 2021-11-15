import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingListItemComponent } from './pending-list-item.component';

describe('PendingListItemComponent', () => {
  let component: PendingListItemComponent;
  let fixture: ComponentFixture<PendingListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
