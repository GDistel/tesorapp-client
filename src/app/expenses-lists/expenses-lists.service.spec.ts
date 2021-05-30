import { TestBed } from '@angular/core/testing';

import { ExpensesListsService } from './expenses-lists.service';

describe('ExpensesListsService', () => {
  let service: ExpensesListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
