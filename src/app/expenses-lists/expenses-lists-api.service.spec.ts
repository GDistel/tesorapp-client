import { TestBed } from '@angular/core/testing';

import { ExpensesListsApiService } from './expenses-lists-api.service';

describe('ExpensesListsApiService', () => {
  let service: ExpensesListsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesListsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
