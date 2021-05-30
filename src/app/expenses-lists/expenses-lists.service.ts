import { ExpensesListsApiService } from './expenses-lists-api.service';
import { Injectable } from '@angular/core';
import { ExpensesList } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesListsService {

  constructor(private expensesListsApiSvc: ExpensesListsApiService) { }

  getExpensesLists(): Promise<ExpensesList[]> {
    return this.expensesListsApiSvc.getExpensesLists();
  }
}
