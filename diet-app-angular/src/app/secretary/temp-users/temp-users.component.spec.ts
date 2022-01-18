import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempUsersComponent } from './temp-users.component';

describe('TempUsersComponent', () => {
  let component: TempUsersComponent;
  let fixture: ComponentFixture<TempUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
