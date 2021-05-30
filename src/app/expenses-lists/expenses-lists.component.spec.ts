import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesListsComponent } from './expenses-lists.component';

describe('ExpensesListsComponent', () => {
  let component: ExpensesListsComponent;
  let fixture: ComponentFixture<ExpensesListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
