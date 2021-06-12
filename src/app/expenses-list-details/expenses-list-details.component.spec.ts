import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesListDetailsComponent } from './expenses-list-details.component';

describe('ExpensesListDetailsComponent', () => {
  let component: ExpensesListDetailsComponent;
  let fixture: ComponentFixture<ExpensesListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesListDetailsComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
