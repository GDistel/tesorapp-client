import { TestBed } from '@angular/core/testing';

import { ExpensesListApiService } from './expenses-list-api.service';

describe('ExpensesListApiService', () => {
  let service: ExpensesListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
