import { ExpensesListsApiService } from './expenses-lists-api.service';
import { Injectable } from '@angular/core';
import { ExpensesList } from './interfaces';
import { BottomNavAction, PagedResponse } from 'src/app/shared';
import { Subject } from 'rxjs';
import { ExpensesListsAction } from './enums';


@Injectable({
  providedIn: 'root'
})
export class ExpensesListsService {

  constructor(private expensesListsApiSvc: ExpensesListsApiService) { }

  getExpensesLists(): Promise<PagedResponse<ExpensesList[]>> {
    return this.expensesListsApiSvc.getExpensesLists();
  }

  getExpensesList(id: string): Promise<ExpensesList> {
    return this.expensesListsApiSvc.getExpensesList(id);
  }

  getNavActions(): BottomNavAction[] {
    return [
      { id: ExpensesListsAction.add, icon: 'add' }
    ];
  }
}
