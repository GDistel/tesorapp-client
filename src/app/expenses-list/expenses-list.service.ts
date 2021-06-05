import { ExpensesListApiService } from './expenses-list-api.service';
import { Injectable } from '@angular/core';
import { PagedResponse } from '../shared';
import { Expense } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListService {

  constructor(private expensesListApiSvc: ExpensesListApiService) { }

  getExpenses(expensesListId: string): Promise<PagedResponse<Expense[]>> {
    return this.expensesListApiSvc.getExpenses(expensesListId);
  }
}
