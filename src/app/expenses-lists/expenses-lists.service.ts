import { ExpensesListsApiService } from './expenses-lists-api.service';
import { Injectable } from '@angular/core';
import { ExpensesList, PagedResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListsService {

  constructor(private expensesListsApiSvc: ExpensesListsApiService) { }

  getExpensesLists(): Promise<PagedResponse<ExpensesList[]>> {
    return this.expensesListsApiSvc.getExpensesLists();
  }
}
